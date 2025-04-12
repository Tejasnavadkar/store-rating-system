import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient()


export const getUserById = async (userId) => {

    try {

        // get the user with store with ratings
        const user = await prisma.user.findUnique({
            where: {
                id: userId
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
                stores: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                        address: true,
                        password: true,
                        ratings: {
                            select: { // Use select here
                                id: true,
                                value: true,
                                user: {
                                    select: {
                                        id: true,
                                        name: true,
                                        email: true,
                                        address: true
                                    }
                                }
                            }
                        },
                        overAllRating: true
                    }
                }
            }
        });

        return user

    } catch (error) {
        throw new Error(error)
    }

}