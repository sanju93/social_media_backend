import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import router from './routes/index.js';
import './config/passport_jwt.js';
import './config/mongoose.js';

let app = express();
dotenv.config();

app.use(cors({
  origin : "http://localhost:3000",
  optionsSuccessStatus : 200,
  // allowedHeaders : ["application/json","multipart/form-data","Authorization"]
}))

const port = 8000 || process.env.port;
 app.use(express.json());
// app.use(express.urlencoded());

app.use('/',router);



app.listen(port,(err) => {
    if (err){
      console.log(err);
      return;
    }

    console.log("Server running on port",port);
})