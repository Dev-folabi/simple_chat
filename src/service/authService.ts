import User from "../models/userModel";
import bcrypt from "bcryptjs"
import Jwt  from "jsonwebtoken";


const secret: any = process.env.JWT_SECRET_KEY;

export const register = async(username: string, password: string ) =>{
    const exsitedUser = await User.findOne({username}) 
    if (exsitedUser) throw new Error('User already exists')

    const hashedPassword = await bcrypt.hash(password, 10)
    
    const user = new User({username, password: hashedPassword})
    await user.save()

    return generateToken(user)
}

export const login = async(username: string, password: string)=>{
    const user = await User.findOne({username});
    if(!user) throw new Error('Invalid credentials')

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) throw new Error('Invalid credentials');

    return generateToken(user);

}

const generateToken = async(user: any)=>{
    return Jwt.sign({id: user._id, username: user.username}, secret, {expiresIn: '1d'})
}