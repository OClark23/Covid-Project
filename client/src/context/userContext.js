import React, {useState, createContext, useEffect} from 'react'

export const UserContext = createContext()

export const UserContextProvider = ({children}) => {
const [userInfo, setUserInfo] = useState({name: '', email: '', userId: ''})

useEffect(() => {
    const name = localStorage.getItem('name');
    const email = localStorage.getItem('email');

    if (name && email) {
        setUserInfo({name, email})
    }
},[])

    return <UserContext.Provider value={{userInfo, setUserInfo}}>{children}</UserContext.Provider>
}
