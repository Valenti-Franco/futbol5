
import connectDB from "@/app/lib/dbConnect"

import { NextResponse } from "next/server"

import { gameModel } from "@/app/models/Game"
import { playerModel } from "@/app/models/Player"


export const GET = async (request, context) => {
    await connectDB()
    const { params } = context;
    try {
        const id = params.id
        const game = await gameModel.findById(id).populate('players').exec();
        const isOpen = params.isOpen

        const userid = params.userid
        const player = await playerModel.findById(userid);

        // console.log(game)
        if (player.role !== "Admin") {
            if (!game) {
                // Return an error response if either the game or player is not found
                return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
            }
            game.isOpen = isOpen
            await game.save();

            return NextResponse.json({ data: game }, { status: 200 });
        } else {
            return NextResponse.json({ data: null, error: "Error de Permisos" }, { status: 404 });

        }


    } catch (error) {
        return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
    }
}