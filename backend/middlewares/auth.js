import jwt from 'jsonwebtoken'
import User from '../models/userModel.js'
import dotenv from 'dotenv'

dotenv.config()

export default  async function authMiddleware(req,res,next){
    const authHeader = req.headers.authorization

    if(!authHeader|| !authHeader.startsWith('Bearer')){
        res.status(401).json({message:"token is missing"})
    }


    const token  =  authHeader.split(' ')[1]

    try {
        const payload = jwt.verify(token,process.env.JWT_SECRET) 

        const user   =  await User.findById(payload.id).select('-password')

        if(!user){
            res.status(401).json({message:"user not found"})
        }

        user =  req.user
        next()
    } catch (error) {
        console.log("jwt token failed",error)
        return res.status(401).json({message:"token Invalid"})
    }
}