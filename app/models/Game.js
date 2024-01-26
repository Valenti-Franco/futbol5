import mongoose from 'mongoose'


const gameSchema = new mongoose.Schema(

    {

        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],
        site: {
            type: String,
            default: "CBA, Arijon 2653, S2011 Rosario, Santa Fe"

        },
        day: {
            type: String,
        },
        time: {
            type: String,

        },
        teamA: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],
        teamB: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Player',
            },
        ],
        urlMap: {
            type: String,

        },

        scoreTeamA: {
            type: Number,
            default: 0,
        },
        scoreTeamB: {
            type: Number,
            default: 0,
        },
        isOpen: {
            type: Boolean,
            default: true,
        },
        isFinish: {
            type: Boolean,
            default: false,
        }

    },
    {
        timestamps: true,
        versionKey: false,
    }



)

export const gameModel = mongoose?.models?.Game || mongoose.model("Game", gameSchema)
