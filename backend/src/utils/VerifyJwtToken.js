import jwt from 'jsonwebtoken'

export const verifyToken = (token) =>{

    try {
        
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined");
    }
    console.log('secret',process.env.JWT_SECRET)
    
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    console.log('decoded',decoded)
    return decoded

    } catch (error){
        console.log('err in verify token',error)
       throw new Error(error)    
    }
}