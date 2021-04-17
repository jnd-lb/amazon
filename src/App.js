import './App.css';
import Chat from './components/Chat/Chat';
import SideBar from './components/SideBar/SideBar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login/Login';
import {useUserContext} from "./components/UserContextProvider";

function App() {
  const user = useUserContext();
  return (
    
    <div className="app">
    {(!user)?(<Login/>):
     (<div className="app__body">
         <Router>
          <SideBar />
          <Switch>
            <Route path="/chat/:id">
              <Chat />
            </Route>
          </Switch>
        </Router> 
      </div>
    )}
    </div>
  );
}

export default App;
