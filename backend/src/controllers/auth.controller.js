import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import authService from '../services/authService.js'
import { HashPassword } from '../utils/HashPassword.js'
import { generateToken } from '../utils/GenerateJwtToken.js'
import { ComparePassword } from '../utils/ComparePassword.js'

const prisma = new PrismaClient()

const registerUser = async (req, res) => {

    const { name, password, email, role, address } = req.body
    const existingUser = await prisma.user.findUnique({ 
        where:{
            email:email
        }
     })

    if (existingUser) {
        return res.status(403).json({ message: 'user already exist' })
    }

    const hashedPassword = await HashPassword(password)

    const payload = {
        name: name,
        email: email,
        password: hashedPassword,
        address: address,
        role: role
    }
    // create user service
    const createdUser = await authService.createUser(payload)

    if (!createdUser) {
        return res.status(401).json({
            message: 'unable to create user'
        })
    }

    console.log('creteduser-',createdUser)
    const jwtPayload = {
        id: createdUser.id,
        email: createdUser.email
    }

   const token =  generateToken(jwtPayload)
   
   res.status(201).json({
    message:'user registerd successfully',
    user:createdUser,
    token
   })

}

const loginUser = async (req, res) => {

    const { email, password } = req.body
    const user = await prisma.user.findUnique({ 
        where:{
            email:email
        }
     })

    if (!user) {
        return res.status(404).json({ message: 'name or password not exist' })
    }

    const hashedPassword = user.password

    const isMatch = ComparePassword(password,hashedPassword)

    if(!isMatch){
        return res.status(401).json({
            message:'name or password not exist'
        })
    }

     // generate jwtToken

    const jwtPayload = {
        id: user.id,
        email: user.email
    }

   const token = generateToken(jwtPayload)
   
   res.status(201).json({

    message:'login successfully',
    user,
    token

   })

}

export default {
    registerUser,
    loginUser
}