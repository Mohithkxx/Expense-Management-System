import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const Authorization = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        console.log("token", token);
        if(!token){
            res.status(400).json({
                message:"Invalid token"
            })
        }
        const decoded = await jwt.verify(token, process.env.SECRET_KEY);
        if(!decoded){
            res.status(400).json({
                message:"Invalid decoded token"
            })
        }        
        req.user = decoded.userId;
        next();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"internal error"
        })
    }
}

export default Authorization