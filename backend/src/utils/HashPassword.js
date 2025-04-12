import bcrypt from "bcryptjs";


const saltRounds = 10

export const HashPassword = async (password) =>{

return await bcrypt.hash(password,saltRounds)

}