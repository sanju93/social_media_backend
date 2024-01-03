import mongoose from "mongoose";

let chatIdSchema = new mongoose.Schema({
    chat_1 : {
        type : String,
        ref : 'User'
    },
    chat_2 : {
        type : String,
        ref : 'User'
    },
    socket_id : {
        type : String
    }
},{timestamps : true});



let ChatId = mongoose.model('ChatId',chatIdSchema);


export default ChatId;