import React, {useState, useEffect} from 'react';

const Products = (props) => {
    const [prod, setProd] = useState(props.data);
    const [mcart, setMcart] = useState([]);
    const [search, setSearch] = useState('');
    const [filterProduct, setFilterProduct] = useState(props.data);

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
    const updateStock = (product) => {
        if(product['actual_stock'] == null ) {
            product['actual_stock'] = product.stock;
        }
        product.stock = product.stock - 1;
        let allprod = [...prod];
        //allprod[i] = product;
        let index = allprod.findIndex( x => x.name === product.name );
        allprod[index] = product;
        setProd(allprod);                 
        props.getProducts(prod);
    }

    const addCart = (product, i) => {
        let mcartdata = mcart;
        mcartdata.push(product);
        const unique = [...new Map(mcartdata.map((item) => [item["name"], item])).values()];  
        
        if(unique.length <= 5) {
            //Unique products
            props.getUniqueRobot(unique);
            
            //Stock update
            updateStock(product);
            
            //Selected products            
            setMcart(mcartdata);
            props.getCart(mcart);
        } else {
            mcartdata.splice(-1);
            unique.splice(-1);
            if (unique.filter(val => val.name === product.name).length > 0) {
                updateStock(product);
            } else {
                alert("Maximum limit exceeded");
            }
            
        }
    }
    
    const productFilter = () => {
        setFilterProduct(prod);
        if(search != '') {           
            const filteredData = [...prod].filter((item) => {
                return (item.material.toLowerCase() === search.toLowerCase());                
            })
            setFilterProduct(filteredData);
        }
    }
    
        
    const _handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            productFilter();
        }
      }

    return (
        <div className="products">
            <div className="header">
                <h1 className="title">Robot Market</h1>
                <div>
                    <input type="text" className="input" placeholder="Search by material" onChange={ (e) => setSearch(e.target.value)} onKeyDown={(e) => _handleKeyDown(e)} onBlur={(e) => productFilter()}/>
                    <button type="button" onClick={() => { productFilter()} }>Search</button>
                </div>
            </div>
            {
                (filterProduct.length > 0) ?
                <div className="grid">
                    {
                        filterProduct.map((product, i) => {
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
                : <h3 className="empty">No Data</h3>
            }
            
        </div>
    )
}

export default Products;