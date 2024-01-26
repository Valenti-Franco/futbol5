import { playerModel } from "@/app/models/Player"
import connectDB from "@/app/lib/dbConnect"

import { NextResponse } from "next/server"
import axios from "axios"


export const PUT = async (req) => {
    await connectDB();
    console.log("xd")
    try {
        const body = await req.json()
        const page = parseInt(body.page) || 1; // Página actual, por defecto 1
        const pageSize = parseInt(body.pageSize) || 10; // Tamaño de página, por defecto 10


        const players = await playerModel
            .find({})
            .sort({ win: -1 })
            .skip((page - 1) * pageSize)
            .limit(pageSize);
        // 
        return NextResponse.json({ data: players }, { status: 200 });

    } catch (error) {
        console.log(error)
        return NextResponse.json({ data: "error" }, { status: 404 });
    }
};



export const POST = async (req, res) => {
    await connectDB()
    try {
        let IsPlayer = false
        const body = await req.json()

        IsPlayer = await playerModel.findOne({
            email: body.email
        }).catch(error => {
            console.error('Error in findOne:', error);
            return null; // o manejo de errores específico
        });;
        if (IsPlayer) {
            // console.log("first name: ")
            return NextResponse.json({ data: IsPlayer }, { status: 200 })
        }
        const newPlayer = await playerModel.create(body)
        return NextResponse.json({ data: newPlayer }, { status: 200 })



    } catch (error) {

        return NextResponse.json({ data: null }, { status: 500 })
    }
}