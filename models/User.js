import mongoose from "mongoose";

let userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : [3,'Atmost three character should be there'],
        maxLength : [10,'Maximum 10 character should be there in name']
    },
    email : {
        type : String,
        required : true,
        unique : true,
    },
    password : {
        type : String,
        required : true,
        minLength : [4,"password is too shorter"]
    },

    friends : [{
        type : mongoose.Schema.Types.String,
        ref : 'User'
    }],

    posts : [{
        type : mongoose.Schema.Types.String,
        ref : 'Post'
    }],
    friendRequestSentBy : [{
        type : mongoose.Schema.Types.String,
        ref : 'User'
    }],
    friendRequestSentTo : [{
        type : mongoose.Schema.Types.String,
        ref : 'User'
    }]


},{
    timestamps : true
});

let User = mongoose.model('User',userSchema);

export default User;


