import React, {useState, useEffect} from 'react';
import Products from './Products';

const Cart = (props) => {
    const [cartData, setCartData] = useState([]);
    const [price, setPrice] = useState(0);
    const [uniqueData, setUniqueData] = useState([]);

    const priceData = cartData.reduce((total, product) => {
        total = total+parseFloat(product.price);
        return total;
    }, 0.00);

    useEffect(() => {
        setCartData(props.robots); 
        setUniqueData(props.unique); 
        setPrice(priceData.toFixed(2));   
    }, [props, cartData]); 
    
    const img = (img) => {
        return img.split("?")[0]
    }

    return (   
        <div className="cartArea">
            <h1 className="title">Cart</h1>
            {
            (uniqueData.length > 0 ) ?
            <div>                
                <ul>
                    {
                        uniqueData.map((data, i) => {
                            return(
                                <li key={i}>
                                    <img src={`${img(data.image)}?size=240x240`} alt="img" />
                                    <h3>{data.name}</h3>
                                    <div className="quantity">
                                        <b className="quantity__minus"><span>-</span></b>
                                        <input name="quantity" type="text" className="quantity__input" value="1" readOnly/>
                                        <b className="quantity__plus"><span>+</span></b>
                                    </div>
                                </li>
                            )
                        })
                    }
                    
                </ul>
                <div className="summary">
                    <h3>Total Amount: {cartData.length}</h3>
                    <h3>Total Price: &#3647;{price}</h3>
                </div>
            </div>
            : <h3 className="empty">Cart is empty!</h3>
            }            
        </div>
    )
}

export default Cart;