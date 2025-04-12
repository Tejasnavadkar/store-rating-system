import { verifyToken } from '../utils/VerifyJwtToken.js'

export const authMiddleware = (req,res,next) => {

   const authHeader = req.headers.authorization

   if(!authHeader){
    return res.status(403).json({message:'token not found'})
   }
  try {
    
  const token = authHeader.split(" ")[1]

  const decoded = verifyToken(token)
console.log('decoded--',decoded)
  req.userId = decoded.id
  next()

  } catch (error) {
      return res.status(411).json({error:error})
  }
}