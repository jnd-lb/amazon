import React from 'react'
import Product from '../Product/Product';
import "./home.scss";

export default function Home() {
    return (
        <div className="home">
            <div className="home__banner">
                <img src="https://image.freepik.com/free-vector/abstract-yellow-black-friday-sale-shopping-banner-design_1017-22263.jpg" alt=""/>
            </div>
            <div className="home__row">
                <Product
                    description={"Cupidatat enim nostrud aliquip  et culpa culpa qui cillum nostrud quis excepteur. Velit aliquip cillum ad non cillum do occaecat nisi sint nostrud sint aute cupidatat aliqua."}
                    price={5}
                    id={1}
                    rating={4}
                    image="https://images.philips.com/is/image/PhilipsConsumer/HR2221_01-IMS-en_LB?$jpglarge$&wid=1250"
                />
                <Product
                    description={"Cupidatat enim nostrud aliquip  et culpa culpa qui cillum nostrud quis excepteur. Velit aliquip cillum ad non cillum do occaecat nisi sint nostrud sint aute cupidatat aliqua."}
                    price={7}
                    id={2}
                    rating={2}
                    image="https://images-na.ssl-images-amazon.com/images/I/41vgd3g6cFL._AC_SX466_.jpg"
                />
            </div>
        </div>
    )
}
