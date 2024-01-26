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
        const team = params.team


        const game = await gameModel
            .findById(id)
            .populate('players')
            .populate('teamA')
            .populate('teamB')
            .exec();


        const player = await playerModel.findById(userid);


        if (!game || !player) {
            // Return an error response if either the game or player is not found
            return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
        }
        if (!game.isOpen) {
            // Return an error response if either the game or player is not found
            return NextResponse.json({ data: null, error: "No podes cambiarte, el partido esta cerrado" }, { status: 404 });
        }

        const playerExists = game.players.some(existingPlayer => existingPlayer.equals(player._id));
        console.log(playerExists);
        if (playerExists) {

            // Si el jugador ya está en la lista, lo eliminamos
            const playerExistsTeam2 = game.teamB.some(existingPlayer => existingPlayer.equals(player._id));
            const playerExistsTeam1 = game.teamA.some(existingPlayer => existingPlayer.equals(player._id));
            if (team === "1") {
                if (game.teamA.length < 5) {

                    if (playerExistsTeam1) {
                        return NextResponse.json({ data: "Ya estas en el equipo Local", status: 400 });

                    } else if (playerExistsTeam2) {
                        game.teamB = game.teamB.filter(existingPlayer => !existingPlayer.equals(player._id));
                        game.teamA.push(player);
                        await game.save();


                    } else {
                        game.teamA.push(player);
                        await game.save();


                    }
                } else {
                    return NextResponse.json({ data: "Ya esta lleno el equipo Local", status: 404 });

                }

            } else {
                if (game.teamB.length < 5) {

                    if (playerExistsTeam2) {
                        return NextResponse.json({ data: "Ya estas en el equipo Visitante", status: 404 });

                    } else if (playerExistsTeam1) {
                        game.teamA = game.teamA.filter(existingPlayer => !existingPlayer.equals(player._id));
                        game.teamB.push(player);
                        await game.save();


                    } else {
                        game.teamB.push(player);
                        await game.save();

                    }
                } else {
                    return NextResponse.json({ data: "Ya esta lleno el equipo Visitante", status: 404 });

                }
            }

        } else {
            // Si el jugador no está en la lista, lo añadimos

            return NextResponse.json({ data: "Tenes que unirte al Partido para elegir equipo", status: 400 });
        }
        await game.save();

        return NextResponse.json({ data: { game }, status: 200 });



    } catch (error) {
        console.log(error)
        return NextResponse.json({ data: null }, { status: 400 })
    }
}
