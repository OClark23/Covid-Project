import React, {useState, createContext} from 'react'

export const UserContext = createContext({name: '', email: ''})
                                    
export const UserContextProvider = ({children}) => {
const [userInfo, setUserInfo] = useState({email: '', password: ''})

    return <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
}