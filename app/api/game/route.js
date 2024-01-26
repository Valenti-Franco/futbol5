import { gameModel } from "@/app/models/Game"
import connectDB from "@/app/lib/dbConnect"
import { playerModel } from "@/app/models/Player"

import { NextResponse } from "next/server"
import axios from "axios"

export const GET = async () => {
    await connectDB()
    try {

        const games = await gameModel.find({})


        return NextResponse.json({ data: games }, { status: 200 })

    } catch (error) {

        return NextResponse.json({ data: null }, { status: 500 })
    }
}


export const POST = async (req, res) => {
    await connectDB()
    try {

        const body = await req.json()
        const headers = req.headers;
        // console.log(headers)

        const idHeaderValue = headers.get('id');
        const player = await playerModel.findById(idHeaderValue);
        if (!player && !player.role !== "admin") {
            return NextResponse.json({ data: "No tenes Permimsos" }, { status: 400 })

        }

        const newGame = await gameModel.create(body)
        return NextResponse.json({ data: newGame }, { status: 200 })



    } catch (error) {

        return NextResponse.json({ data: null }, { status: 500 })
    }
}