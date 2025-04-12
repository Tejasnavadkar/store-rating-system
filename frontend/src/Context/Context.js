import { createContext, useContext} from "react";

 
export const StoreContext = createContext()

export const useStore = () =>{   // custome hook to access context values
    return useContext(StoreContext)
}


