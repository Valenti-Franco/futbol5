import connectDB from "@/app/lib/dbConnect"

import { NextResponse } from "next/server"

import { playerModel } from "@/app/models/Player"


export const GET = async (request, context) => {
    await connectDB()
    const { params } = context;
    try {
        const id = params.id
        // console.log(id)
        const player = await playerModel.findById(id)

        // console.log(player)

        if (!player) {
            // Return an error response if either the game or player is not found
            return NextResponse.json({ data: null, error: " player not found" }, { status: 404 });
        }
        return NextResponse.json({ data: player }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ data: null, error: " player not found" }, { status: 404 });
    }
}

export const POST = async (req, context) => {
    await connectDB();
    const { params } = context;
    try {
        const id = params.id

        const body = await req.json();
        // console.log(body)
        // Check if the name already exists
        const existingPlayer = await playerModel.findOne({ name: body.name });

        if (existingPlayer) {
            return NextResponse.json({ data: existingPlayer }, { status: 400 });
        }
        const player = await playerModel.findById(id);
        if (!player) {
            return NextResponse.json({ message: 'Jugador no encontrado' }, { status: 404 });
        }

        // Cambia el nombre del jugador con el nuevo nombre proporcionado en el cuerpo de la solicitud
        player.name = body.name;

        // Guarda el jugador actualizado en la base de datos
        await player.save();


        return NextResponse.json({ data: player }, { status: 200 });
    } catch (error) {
        console.error('Error:', error);
        return NextResponse.json({ data: null }, { status: 500 });
    }
};