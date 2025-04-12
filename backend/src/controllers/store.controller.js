import pkg from '@prisma/client';
const { PrismaClient } = pkg;
import { createStore, getStores } from '../services/store.Service.js'
import { HashPassword } from '../utils/HashPassword.js'

const prisma = new PrismaClient()


const getAllStore = async (req,res) => {

try {
    
    const filter = req.query.filter || ""  // if filter undefined then get all

    const stores = await getStores(filter)

    return res.status(201).json({
        allstores:stores
    })

    
} catch (error) {
    throw new Error(`error while getting stores:${error}`)
}
    
}


const createStoreWithOwner = async (req,res) => {
try {
    
    const {name,email,address,password,ownerName,ownerEmail,ownerPassword,ownerAddress} = req.body

    if (!name || !email || !address || !password || 
       !ownerName || !ownerEmail || !ownerAddress || !ownerPassword) {
       return res.status(400).json({
           message: 'All fields are required'
       });
   }

    //check if store already exist
   const existingStore = await prisma.store.findUnique({
    where:{
        email:email
    }
   })
   
   if(existingStore){
       return res.status(400).json({
           message:'store already exists'
       })
   }

   //check if owner already exist
   const existingOwner = await prisma.store.findUnique({
    where:{
        email:ownerEmail
    }
   })
   
   if(existingOwner){
       return res.status(400).json({
           message:'owner already exists'
       })
   }

   const hashedStorePassword = await HashPassword(password)
   const hashedOwnerPassword = await HashPassword(ownerPassword)

   const storeData = {
       name,
       email,
       address,
       password: hashedStorePassword,
       ownerName,
       ownerEmail,
       ownerAddress,
       ownerPassword: hashedOwnerPassword
   };

   
   const newStore = await createStore(storeData);
//    console.log('newStore--',newStore)
   return res.status(201).json({
       message: 'Store created successfully',
       store: newStore
   });
} catch (error) {
    console.log('error-in-addstore-',error)
    return res.status(500).json({
        message:'Error creating store',
        error:error.message
    })
}
    
}

const rateStore = async (req,res) => {
    const {storeId} = req.params
    const {score} = req.body //score 1 to 5
    const userId = req.userId // come from middleware
    console.log('userId',userId)
    try {
        
    if (!score || score < 1 || score > 5) {
        return res.status(400).json({
            message: 'Score must be between 1 and 5'
        });
    }

  const store = await prisma.store.findUnique({
        where: {
            id: parseInt(storeId)
        },
        include: {
            ratings: true
        }
    })

    if (!store) {
        return res.status(404).json({
            message: 'Store not found'
        });
    }

    const existingRating = await prisma.rating.findUnique({
        where: {
            userId_storeId: {
                userId: parseInt(userId),
                storeId: parseInt(storeId)
            }
        }
    });

   if(existingRating){
    return res.status(400).json({message:'you have already rated this store, modify your rating'})
   }

     // Create new rating
     const newRating = await prisma.rating.create({
        data: {
            value: parseInt(score),
            userId: parseInt(userId),
            storeId: parseInt(storeId)
        }
    });

    // Calculate new overall rating
    const allRatings = await prisma.rating.findMany({
        where: {
            storeId: parseInt(storeId)
        }
    });

    const totalScore = allRatings.reduce((sum, rating) => sum + rating.value, 0);
    const averageRating = Math.round(totalScore / allRatings.length);

    // Update store's overall rating
    await prisma.store.update({
        where: {
            id: parseInt(storeId)
        },
        data: {
            overAllRating: averageRating
        }
    });

    return res.status(201).json({
        message: 'Rating submitted successfully',
        rating: newRating,
        storeNewRating: averageRating
    });

    } catch (error) {
        console.error('Error in rateStore:', error);
        // console.log('err submitin rating',error)
        return res.status(500).json({
            message: 'Error submitting rating',
            error: error.message
        });
    }


}

const modifyRating = async (req,res) => {

    const {storeId} = req.params
    const {score} = req.body //score 1 to 5
    const userId = req.userId // come from middleware

    try {

        if (!score || score < 1 || score > 5) {
            return res.status(400).json({
                message: 'Score must be between 1 and 5'
            });
        }

    //finding existing rating
      const existingRating = await prisma.rating.findUnique({
            where: {
                userId_storeId:{
                    userId:parseInt(userId),
                    storeId:parseInt(storeId)
                }
            }
        })
    
        if (!existingRating) {
            return res.status(404).json({
                message: 'No rating found for this store, first submit rating'
            });
        }

        const updatedRating = await prisma.rating.update({
            where:{
                userId_storeId:{
                    userId:parseInt(userId),
                    storeId:parseInt(storeId)
                }
            },
            data:{
                value:parseInt(score)
            }
        })

       const allRatings = await prisma.rating.findMany({
            where:{
                storeId:parseInt(storeId)
            }
        })

        // recalculate stores overall rating and update store
       const totalScore = allRatings.reduce((sum,rating)=>sum + rating.value,0)

       const averageRating = Math.round(totalScore/allRatings.length)
        
       // Update store's overall rating
         await prisma.store.update({
            where: {
                id: parseInt(storeId)
            },
            data: {
                overAllRating: parseInt(averageRating)
            }
        });

        return res.status(200).json({
            message: 'Rating modified successfully',
            rating: updatedRating,
            storeNewRating: averageRating
        });
        
    } catch (error) {
        return res.status(500).json({
            message:'Error submitting rating',
            error:error.message
        })
    }


}



export default {
    getAllStore,
    createStoreWithOwner,
    rateStore,
    modifyRating
}