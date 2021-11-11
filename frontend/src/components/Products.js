import React, {useState} from 'react';

const Products = (props) => {
    const [prod, setProd] = useState(props.data);
    const [mcart, setMcart] = useState([]);

    /*date format*/
    const formatDate = (date) => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [day, month, year].join('-');
    }

    /*Image size render*/
    const img = (img) => {
        return img.split("?")[0]
    }

    /* Stock update */
    const updateStock = (product, i) => {
        product.stock = product.stock - 1;
        let allprod = [...prod];
        allprod[i] = product;
        setProd(allprod);                 
        props.getProducts(prod);
    }

    const addCart = (product, i) => {
        let mcartdata = mcart;
        mcartdata.push(product);
        const unique = [...new Map(mcartdata.map((item) => [item["name"], item])).values()];  
        
        if(unique.length <= 1) {
            //Unique products
            props.getUniqueRobot(unique);
            
            //Stock update
            updateStock(product, i);
            
            //Selected products            
            setMcart(mcartdata);
            props.getCart(mcart);
        } else {
            mcartdata.splice(-1);
            unique.splice(-1);
            if (unique.filter(val => val.name === product.name).length > 0) {
                updateStock(product, i);
            } else {
                alert("Maximum limit exceeded");
            }
            
        }
    }
    
    return (
        <div className="products">
            <h1 className="title">Robot Market</h1>
            {
                prod.map((product, i) => {
                    return (
                        <div className="cardDiv" key={i}>
                            <div className="card">
                                <img src={`${img(product.image)}?size=240x240`} alt="img" />
                                <h3>{product.name}</h3>
                                <span className="material">{product.material}</span>
                                <h4>&#3647; {product.price}</h4>
                                <div className="additional">
                                    <span className="stock"> In stock: {product.stock}</span>
                                    <span className="date">Created at: {formatDate(product.createdAt)}</span> 
                                </div>
                                <button className={(product.stock > 0) ? `active` : 'inactive'} onClick={() => (product.stock > 0) ? addCart(product, i) : null  }>add to cart</button>                            
                            </div>
                        </div>
                    )
                })
            }
            
        </div>
    )
}

export default Products;