import React, {useEffect, useState} from "react";
import axios from 'axios';
import './App.scss';
import Products from './components/Products';
import Cart from './components/Cart';

function App() {
  
  const [loader, setLoader ] = useState(true);
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState([]);
  const [uniqueRobot, setUniqueRobot] = useState([]);
  
  const url = 'http://localhost:8000/api/robots';
  useEffect(() => {
    axios.get(url).then((res) => {
      setProducts(res.data.data);
      setLoader(false);
    }).catch( error => console.error(`error ${error}`));
  }, []);

  return (
    <div className="App">
      <div className="body-wrap">
        <div className="container">
        { (!loader) ?
        <div className="row">
          <div className="col-9 padding15">
            <Products data={products} 
            getCart={ product => setCart(product) } 
            getProducts={data => setProducts(data)} 
            getUniqueRobot = { data => setUniqueRobot(data) }/>
          </div>
          <div className="col-3 padding15 cartFixed">
            <Cart robots={cart} unique = {uniqueRobot} data={products} getProducts={data => setProducts(data)}  />
          </div>
        </div>
        
        :
        <div className="lds-roller loader"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        }
        </div>
      </div>
    </div>
  );
}

export default App;
