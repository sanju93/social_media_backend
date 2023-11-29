import mongoose from 'mongoose';

mongoose.connect('mongodb://localhost:27017/social_media_app')
.then(
    () => {
        console.log("Database connected Successfully");
    },
    (err) => {
       console.log("error occuring in database connection",err);
    }
)

export default mongoose;