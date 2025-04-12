import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient()

const createUser = async (payload) =>{
try {
    console.log('payload-',payload)
   const response = await prisma.user.create({
    data:{
        name:payload.name,
        email:payload.email,
        password:payload.password,
        address:payload.address,
        role:payload.role
    }
})

return response

} catch (error) {
    console.log('error in createUser--',error)
    throw Error('unable to create user',error)    
}
}

export default {
    createUser
}