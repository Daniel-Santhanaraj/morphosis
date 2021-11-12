import React, {useState, useEffect} from 'react';
import Products from './Products';

const Cart = (props) => {
    const [cartData, setCartData] = useState([]);
    const [price, setPrice] = useState(0);
    const [amount, setAmount] = useState(0);
    const [uniqueData, setUniqueData] = useState([]);
    const [allProducts, setAllProducts] = useState(props.data);

    const priceData = uniqueData.reduce((total, product) => {
        total= total + parseFloat(product.price) * (product.actual_stock - product.stock)
        return total;
    }, 0.00);

    const amountData = uniqueData.reduce((total, product) => {
        total= total + (product.actual_stock - product.stock)
        return total;
    }, 0);

    useEffect(() => {
        setCartData(props.robots); 
        setUniqueData(props.unique); 
        setPrice(priceData.toFixed(2));  
        setAmount(amountData);  
    }, [props, cartData, uniqueData]); 
    
    const img = (img) => {
        return img.split("?")[0]
    }

    let stockVal = (data) => {
        const result = data.actual_stock - data.stock;
        return (result != 0) ? result : 0;
    }

    let counter = (val, action) => {
        let result = [...allProducts].map((prod, i) => {
                        if(prod.name == val.name) {
                            if(prod.stock != 0 && action == 'inc') {                
                                prod.stock = prod.stock - 1;
                            } else if(prod.stock < prod.actual_stock-1 && action == 'dec') { 
                                prod.stock = prod.stock + 1;
                            }  else {
                                return false;
                            }              
                        }
                        return prod;
                    })
        props.getProducts(result);
    }

    return (   
        <div className="cartArea">
            <h1 className="title">Cart ({amount})</h1>
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
                                        <b className="quantity__minus" onClick={() => counter(data, 'dec')}><span>-</span></b>
                                        <input name="quantity" type="text" className="quantity__input" value={stockVal(data)} readOnly/>
                                        <b className="quantity__plus" onClick={() => counter(data, 'inc')}><span>+</span></b>
                                    </div>
                                </li>
                            )
                        })
                    }
                    
                </ul>
                <div className="summary">
                    <h3>Total Amount: {amount}</h3>
                    <h3>Total Price: &#3647; {price}</h3>
                </div>
            </div>
            : <h3 className="empty">Cart is empty!</h3>
            }            
        </div>
    )
}

export default Cart;