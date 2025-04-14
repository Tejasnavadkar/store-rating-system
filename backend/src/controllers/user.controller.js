import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { getUserById } from '../services/user.Service.js'
import { HashPassword } from '../utils/HashPassword.js'

const prisma = new PrismaClient()

const getUser = async (req, res) => {

    try {
        const userId = req.userId // from middleware

        const user = await getUserById(userId)

        if (!user) {
            return res.status(401).json({
                message: 'user not found'
            })
        }

        return res.status(201).json({
            user: user
        })


    } catch (error) {
        console.log('fetching user',error)
        return res.status(500).json({
            message: 'Error getting user',
            error: error.message
        })
    }

}

const getAllUsers = async (req, res) => {
    console.log('hii')

    const filter = req.query.filter || ""
    console.log('filter--',filter)
    try {


        const users = await prisma.user.findMany({
            
                where:{
                    OR:[
                        {
                            name:{
                                contains:filter,
                                mode:'insensitive'
                            }
                        },
                        {
                            email:{
                                contains:filter,
                                mode:'insensitive'
                            }
                        },
                        {
                            address:{
                                contains:filter,
                                mode:'insensitive'
                            }
                        }
                    ]
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    address: true,
                    role: true,
                    ratings:true,
                    stores:true
                    }
                  
        })

        //  if(!users){
        //      return res.status(401).json({
        //          message:'users not found'
        //      })
        //  }

        return res.status(201).json({
            user: users
        })


    } catch (error) {
       throw new Error('err in getAllusers controllers--',error)
    }

}

const forgotPassword = async (req, res) => {

    const { email, password } = req.body
try {
    
    const user = await prisma.user.findUnique({
        where: {
            email
        }
    })

    if (!user) {
        return res.status(401).json({
            message: 'user not exist'
        })
    }

    const hashedPassword = HashPassword(password)

    const updatedUser = prisma.user.update({
        where: {
            email
        },
        data: {
            password: hashedPassword
        }
    })

    return res.status(201).json({
        message: 'password updated successfully',
        updatedUser
    })

} catch (error) {
    res.status(500).json({
        message: 'Error forgot password',
        error: error.message
    })
}

}

export default {
    getUser,
    getAllUsers,
    forgotPassword
}