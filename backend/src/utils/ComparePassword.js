import bcrypt from "bcryptjs";

export const ComparePassword = (password, hashedPassword) => {

    try {

        return bcrypt.compare(password, hashedPassword)

    } catch (error) {
        
        throw Error(error)
    }
}