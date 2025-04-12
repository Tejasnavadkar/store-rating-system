import React from 'react'
import { Navigate} from 'react-router-dom'

const Protected = ({ children }) => {

    const token = localStorage.getItem('token')

    if (!token) { // unauthenticated navigate to login
        return <Navigate to={'/'} />
    }

    return (
        <div>
            {children}
        </div>
    )
}

export default Protected
