import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient()


export const getStores = async (filter = "") =>{
try {
    
 const stores = await prisma.store.findMany({
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
        ratings: {
            select: {
                id: true,
                value: true,
                user: {
                    select: {
                        name: true,
                        email: true
                    }
                }
            }
        },
        owner: {
          select: {
            name: true,
            role: true
          }
        }
      }
   })

   return stores
} catch (error) {
    
    throw new Error(`Error while fetching stores:${error}`)
}

}


export const createStore = async (storeData) =>{

    try {
        
     const cretedStore = await prisma.store.create({
        data:{
            name:storeData.name,
            email:storeData.email,
            address:storeData.address,
            password:storeData.password,
            owner:{
                create:{
                    name: storeData.ownerName,
                        email: storeData.ownerEmail,
                        password: storeData.ownerPassword,
                        address: storeData.ownerAddress,
                        role: "OWNER"
                }
            }
        },
        include: {
            owner: {
                select: {
                    id: true,
                    name: true,
                    email: true,
                    role: true
                }
            }
        }
      })
      return cretedStore

    } catch (error) {
      throw new Error('err while creating store',error)  
    }

}

// name,email,adress and role 