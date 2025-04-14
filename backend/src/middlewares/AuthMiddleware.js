import { verifyToken } from '../utils/VerifyJwtToken.js'

export const authMiddleware = (req,res,next) => {

   const authHeader = req.headers.authorization
   console.log('authHeader--',authHeader)

   if(!authHeader){
    return res.status(403).json({message:'token not found'})
   }
  try {
    
  const token = authHeader.split(" ")[1].replace(/"/g,'')  // replace double quotes to single quotes from token double quotes throw error
console.log('token',token)
  const decoded = verifyToken(token)
console.log('decoded--',decoded)
  req.userId = decoded.id
  next()

  } catch (error) {
    console.log('err in middleware',error)
      return res.status(411).json({error:error.message})
  }
}