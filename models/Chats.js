import mongoose from "mongoose";



let chatSchema = new mongoose.Schema({
    messages : [
        {
            type : {
                type : String,
                enum : ["you","other"]
            },
            chat : {
                type : String
            }
        
        }
    ]
},{
    timestamps : true
});

let Chats = mongoose.model('Chats',chatSchema);


export default Chats;