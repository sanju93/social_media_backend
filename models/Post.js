import mongoose from 'mongoose';

let PostSchema = new mongoose.Schema({
    user_id : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User'
    },
    type : {
        type : String,
        enum : ["Text","Image","Video"]
    },
    ContentName : {
        type : String,
        unique : true
    },
    text : {
        type : String
    }
},{
    timestamps : true
});


let Post = mongoose.model('Post',PostSchema);

export default Post;