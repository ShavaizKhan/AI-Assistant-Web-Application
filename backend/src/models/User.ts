import mongoose from "mongoose";
import { randomUUID } from 'crypto';

const chatSchema = new mongoose.Schema({
    id: {
        type: String, 
        default: randomUUID(),
    },
    // the user
    role: {
        type: String,
        required: true,
    },
    // the actual message 
    content: {
        type: String,
        required: true,
    }
})
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String, 
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    // chats will have array of chat schema
    chats: [chatSchema],
});

export default mongoose.model("User", userSchema);