import React from 'react'
import "./header.scss"
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom'
import {useStateValue} from '../StateProvider'
import {auth} from "../../firebase"

export default function Header() {

    const [{basket,user}, dispatch] = useStateValue();

    const handleSignout = function(){
            if(user){
                auth.signOut();
            }
    }

    return (
        <div className="header">
            <Link to="/">
                <div className="header__logo">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG25.png" alt="" />
                </div>
            </Link>
            <div className="header__search">
                <input type="text" />
                <SearchIcon className="header__search__icon" />
            </div>

            <div className="header__options">
                <Link to={!user && "/login"}>
                <div className="header__option">
                    <span  className="header__option__lineOne">
                        Hello
                    </span>
                    <span onClick={handleSignout} className="header__option__lineTwo">
                        {(user)?"Sign out":"Sign in"}
                    </span>
                </div>
                </Link>
                <div className="header__option">
                    <span className="header__option__lineOne">
                        Returns
                    </span>
                    <span className="header__option__lineTwo">
                        & Orders
                    </span>
                </div>
                <div className="header__option">
                    <span className="header__option__lineOne">
                        Your
                    </span>
                    <span className="header__option__lineTwo">
                        Prime
                    </span>
                </div>
                <Link to="/cart">
                    <div className="header__option__basket">
                        <span className="header__option__basket">
                            <ShoppingBasketIcon />
                        </span>
                        <span className="header__option__basket__count">
                            {basket.reduce((count,b)=>(b.count+count),0)}
                    </span>
                    </div>
                </Link>
            </div>

        </div>
    )
}
