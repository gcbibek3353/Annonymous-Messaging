import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    from : {
        type : String,
        default : ''
    },
    to : {
        type : String,
        default : ''
    },
    title : {
        type : String,
        default : ''
    },
    description : {
        type : String,
        default : ''
    }
})

export const message = mongoose.model('message', messageSchema);

