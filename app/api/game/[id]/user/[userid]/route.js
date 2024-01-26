import connectDB from "@/app/lib/dbConnect"

import { NextResponse } from "next/server"

import { gameModel } from "@/app/models/Game"
import { playerModel } from "@/app/models/Player"

export const GET = async (request, context) => {
    await connectDB()
    const { params } = context;
    try {
        const id = params.id
        const userid = params.userid
        const player = await playerModel.findById(userid);


        const game = await gameModel.findById(id);



        if (!game || !player) {
            // Return an error response if either the game or player is not found
            return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
        }
        if (!game.isOpen) {
            // Return an error response if either the game or player is not found
            return NextResponse.json({ data: null, error: "Error, el partido ya esta cerrado" }, { status: 404 });
        }

        const playerExists = game.players.some(existingPlayer => existingPlayer.equals(player._id));
        // console.log(playerExists);
        if (playerExists) {

            // Si el jugador ya está en la lista, lo eliminamos
            game.players = game.players.filter(existingPlayer => !existingPlayer.equals(player._id));

            game.teamA = game.teamA.filter(existingPlayer => !existingPlayer.equals(player._id));
            game.teamB = game.teamB.filter(existingPlayer => !existingPlayer.equals(player._id));

            player.games = player.games.filter(existingPlayer => !existingPlayer.equals(game._id));

        } else {
            // Si el jugador no está en la lista, lo añadimos

            game.players.push(player);
            player.games.push(game);

        }
        await game.save();
        await player.save();


        return NextResponse.json({ data: { game }, status: 200 });



    } catch (error) {
        console.log(error)
        return NextResponse.json({ data: null }, { status: 400 })
    }
}