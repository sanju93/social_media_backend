import passport from 'passport';
import {ExtractJwt,Strategy} from 'passport-jwt';
import User from '../models/User.js';
import dotenv from 'dotenv';
dotenv.config();


passport.use(new Strategy({
   jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
   secretOrKey: process.env.secret
},async function(payload,done){

    
   try{
   let user = await User.findById(payload.data._id);
   
    if (user){
        return done(null,user);
       }else{
        return done(null,false);
       }
   }catch(err){

    return done(null,false);

   }
   
}));

export default passport;
