import User from '../models/User.js';
async function Home(req,res) {
 
    let user = await User.find({}).sort({"createdAt" : "descending"});


    return res.send(user);
}

export {Home};