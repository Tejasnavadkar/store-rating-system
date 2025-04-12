import { useState } from "react"
import { StoreContext } from "./Context"



export const ContextProvider = ({children}) =>{

    const [totalUser,setTotalUser] = useState(null)
    const [totalStore,setTotalStore] = useState(null)
    const [currentUser,setCurrentUser] = useState(null)
    const [totalUsersSubmittedRating,setTotalUsersSubmittedRating] = useState(null)

    return <StoreContext.Provider value={{totalUser,setTotalUser,totalStore,setTotalStore,currentUser,setCurrentUser,totalUsersSubmittedRating,setTotalUsersSubmittedRating}} >
        {children}
    </StoreContext.Provider>
}