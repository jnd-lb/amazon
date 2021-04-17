import React,{useContext,useState} from 'react'

const UserContext = React.createContext();
const UserUpdateContext = React.createContext();

export default function UserContextProvider({children}) {
    const [user,setUser] = useState(null);
    
    return (
        <UserContext.Provider value={user}>
            <UserUpdateContext.Provider value={setUser}>
            {children}
        </UserUpdateContext.Provider>
        </UserContext.Provider>
    )
}

export const useUserContext = ()=>{
    return useContext(UserContext)
}

export const useUserUpdateContext =()=>{
    return useContext(UserUpdateContext);   
}