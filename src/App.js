import './App.css';
import React, { useEffect } from 'react'
import Header from './components/Header/Header';
import Home from './components/Home/Home';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Cart from './components/Cart/Cart';
import Login from './components/Login/Login';
import { auth } from "./firebase"
import { useStateValue } from "./components/StateProvider"
import { loadStripe } from '@stripe/stripe-js'
import { Elements } from '@stripe/react-stripe-js'
import Payment from './components/Payment/Payment';
function App() {
  const [state, dispatch] = useStateValue();

  const promise = loadStripe("pk_test_51ImBl6H2xvXzgvrNxC0UIZpaLiOOUyGRJVlECokKvs4NsjYJqOgHbSpV3peRf76JAMczpR6lQiKuBvhpuGrsyMZq00KlS2yc6N")
  useEffect(() => {
    auth.onAuthStateChanged(authuser => {
      console.log("???", authuser)
      dispatch({
        type: "SET_USER",
        user: authuser
      })
    })
  }, [])

  return (

    <div className="app">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route path="/payment">
            <Elements stripe={promise}>
              <Payment/>
            </Elements>
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
