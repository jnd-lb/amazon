import React,{useContext,useState} from 'react'

const ChatContext = React.createContext();

export default function ChatContextProvider({children}) {
    const [chat,setChat] = useState(null)
    return ( 
        <ChatContext.Provider value={[chat,setChat]}>
            {children}
        </ChatContext.Provider>
    )
}

export const useChatContext=()=>{
    return useContext(ChatContext)
}


