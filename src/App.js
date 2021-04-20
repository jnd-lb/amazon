import './App.css';
import Chat from './components/Chat/Chat';
import SideBar from './components/SideBar/SideBar';
import Login from './components/Login/Login';
import {useUserContext} from "./components/UserContextProvider";
import {useChatContext} from "./components/ChatContextProvider";
import WelcomeScreen from './components/WelcomeScreen/WelcomeScreen';

function App() {
  const user = useUserContext();
  console.log(useChatContext())
  const [chat,setChat] = useChatContext();
  console.log(useChatContext())
  return (
    
    <div className="app">
    {(!user)?(<Login/>):
     (<div className="app__body">
          <SideBar />
          {(chat)?<Chat />:<WelcomeScreen/>}       
      </div>
    )}
    </div>
  );
}

export default App;
