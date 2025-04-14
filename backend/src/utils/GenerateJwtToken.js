import jwt from 'jsonwebtoken'

export const generateToken = (jwtPayload) => {
    
    try {
        // console.log('jwtPayload',jwtPayload)
        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined");
        }

      return jwt.sign(jwtPayload,process.env.JWT_SECRET)
      
    } catch (error) {
        throw new Error(error);
    }
}