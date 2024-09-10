import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import HandlerDatabase from './Config/db.js';
import Authrouter from './Router/authrouter.js'



const app = express();
const port = process.env.PORT

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

//routers
app.use(Authrouter)

app.get("/",(req, res)=>{
    res.send("welcome Expense Mangement system!");
})


app.listen(port,()=>{
    console.log(`server listening on port ${port}`);
    HandlerDatabase();
})