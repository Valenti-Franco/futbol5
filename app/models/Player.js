import mongoose from 'mongoose'


const playerSchema = new mongoose.Schema(
    {

        name: {
            type: String,
            required: [true, "Please complete the field"],
        },
        email: {
            type: String,
            required: [true, "Please complete the field"],
            unique: true,
        },
        role: {
            type: String,
            default: "user",
        },
        url: {
            type: String,
            required: [true, "Please complete the field"],
        },
        win: {
            type: Number,
            default: 0,
        },
        played: {
            type: Number,
            default: 0,
        },
        games: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Game',
            },
        ],
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

export const playerModel = mongoose?.models?.Player || mongoose.model("Player", playerSchema)
