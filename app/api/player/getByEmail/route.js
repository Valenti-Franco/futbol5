
import { playerModel } from "@/app/models/Player"
import connectDB from "@/app/lib/dbConnect"

import { NextResponse } from "next/server"

export const POST = async (req, res) => {
    await connectDB();


    try {

        const emailResponse = await req.json()
        console.log(emailResponse)
        if (!emailResponse || !emailResponse.email) {
            return NextResponse.json({ data: null, message: 'Invalid input data' }, { status: 400 });
        }
        const player = await playerModel.findOne({ email: emailResponse.email });
        if (player) {
            return NextResponse.json({ data: player }, { status: 200 });
        } else {
            return NextResponse.json({ data: null, message: 'Player not found' }, { status: 404 });
        }
    } catch (error) {
        console.log("first error: ", error)
        return NextResponse.json({ data: null }, { status: 500 });
    }
}