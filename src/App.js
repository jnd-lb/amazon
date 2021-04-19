import './App.css';
import Chat from './components/Chat/Chat';
import SideBar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import {useUserContext} from "./components/UserContextProvider";
import {useChatContext} from "./components/ChatContextProvider";

function App() {
  const user = useUserContext();
  console.log(useChatContext())
  const [chat,setChat] = useChatContext();
  console.log(useChatContext())
  return (
    
    <div className="app">
    {(!user)?(<Login/>):
     (<div className="app__body">
       <Router>

          <SideBar />
          {(chat)?<Chat />:<div className="app__welcomescreen">
              <img src="https://static.vecteezy.com/system/resources/previews/001/308/763/non_2x/woman-working-from-home-student-or-freelancer-vector.jpg" alt="girl using a laptop" />
              <h1>Welcome to the Web Whatsapp Clone</h1>
            </div>}
           
       </Router>
      </div>
    )}
    </div>
  );
}

export default App;
