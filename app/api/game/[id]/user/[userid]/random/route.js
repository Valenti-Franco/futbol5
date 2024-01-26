
import connectDB from "@/app/lib/dbConnect"

import { NextResponse } from "next/server"

import { gameModel } from "@/app/models/Game"
import { playerModel } from "@/app/models/Player"


function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
}

export const GET = async (request, context) => {
    await connectDB()
    const { params } = context;
    try {
        const id = params.id
        const game = await gameModel.findById(id).populate('players').exec();

        const userid = params.userid
        const player = await playerModel.findById(userid);

        // console.log(game)
        if (player.role !== "Admin") {
            if (!game) {
                // Return an error response if either the game or player is not found
                return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
            }
            //LOGICA 
            const players = game.players.map(player => player._id);
            shuffleArray(players);

            // Calculate the midpoint of the players array
            const midpoint = Math.ceil(players.length / 2);

            // Assign the first half of shuffled players to teamA
            const teamAPlayers = players.slice(0, midpoint);
            game.teamA = teamAPlayers;

            // Assign the second half of shuffled players to teamB
            const teamBPlayers = players.slice(midpoint);
            game.teamB = teamBPlayers;


            // console.log(teamBPlayers)
            // console.log(teamAPlayers)
            await game.save();

            return NextResponse.json({ data: game }, { status: 200 });
        } else {
            return NextResponse.json({ data: null, error: "Error de Permisos" }, { status: 404 });

        }


    } catch (error) {
        return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
    }
}