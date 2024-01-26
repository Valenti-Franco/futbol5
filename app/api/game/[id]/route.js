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

        // console.log(game)

        if (!game) {
            // Return an error response if either the game or player is not found
            return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
        }
        return NextResponse.json({ data: game }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ data: null, error: "Game or player not found" }, { status: 404 });
    }
}


export const DELETE = async (request, context) => {
    await connectDB();
    const { params } = context;
    // console.log(" xddd")
    try {
        const headers = request.headers;
        const id = params.id;
        const game = await gameModel.findById(id).populate('players').exec();
        // console.log(game)



        if (!game) {
            return NextResponse.json({ data: null, error: "Game not found" }, { status: 404 });
        }
        const idHeaderValue = headers.get('id');
        const player = await playerModel.findById(idHeaderValue);
        if (!player && !player.role !== "admin") {
            return NextResponse.json({ data: "No tenes Permimsos" }, { status: 400 })

        }
        // Elimina el juego y su referencia de los jugadores
        try {
            const playerIds = game.players.map(player => player._id);
            await playerModel.updateMany(
                { _id: { $in: playerIds } },
                { $pull: { games: id } }
            );
            await game.deleteOne(); // For Mongoose v6 and later
            // OR
            // await game.remove(); // For Mongoose v5 or earlier
        } catch (error) {
            console.log(error);
        }

        return NextResponse.json({ message: "Partido Eliminado" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ data: null, error: "Error deleting game" }, { status: 500 });
    }
};


export const PUT = async (request, context) => {
    await connectDB();
    const { params } = context;
    // console.log(" xddd")
    try {
        const headers = request.headers;
        const body = await request.json()
        const id = params.id;
        const game = await gameModel.findById(id).populate('players').exec();
        // console.log(body)

        const teamA = Number(body.teamA)
        const teamB = Number(body.teamB)

        // console.log(teamA > teamB ? "teamA" : "teamB")




        if (!game) {
            return NextResponse.json({ data: null, error: "Game not found" }, { status: 404 });
        }
        if (game.isFinish) {
            return NextResponse.json({ data: null, error: "El juego ya esta terminado" }, { status: 404 });

        }
        const idHeaderValue = headers.get('id');
        const player = await playerModel.findById(idHeaderValue);
        if (!player && !player.role !== "admin") {
            return NextResponse.json({ data: "No tenes Permimsos" }, { status: 400 })

        }
        try {
            let winningTeamPlayerIds = [];
            if (teamA > teamB) {
                winningTeamPlayerIds = game.teamA.map(player => player._id);
            } else {
                winningTeamPlayerIds = game.teamB.map(player => player._id);
            }

            // Actualizar el contador 'win' para los jugadores del equipo ganador
            await playerModel.updateMany(
                { _id: { $in: winningTeamPlayerIds } },
                { $inc: { win: 1 } } // Incrementa el contador 'win' en 1
            );
            game.players.forEach(async (player) => {
                await playerModel.findByIdAndUpdate(player._id, { $inc: { played: 1 } });
            });

        } catch (error) {
            console.log(error)
        }
        // Elimina el juego y su referencia de los jugadores


        game.scoreTeamA = body.teamA;
        game.scoreTeamB = body.teamB;
        game.isFinish = true;
        await game.save();
        return NextResponse.json({ message: "Partido Terminado" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ data: null, error: "Error deleting game" }, { status: 500 });
    }
};



