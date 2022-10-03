import React from "react";
import axios from "axios";
import Card from "../components/Card";
import AppContext from "../context";

function Orders({}) {
  const { onAddToFavorite, onAddToCart } = React.useContext(AppContext);
  const [orders, setOrders] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true); 


  React.useEffect(() => {
    
    (async () => {
      try {
        const { data } = await axios.get('https://62a743e797b6156bff8b6ea6.mockapi.io/orders');
      setOrders(data.reduce((prev,obj) => [...prev, ...obj.items], []));
      setIsLoading(false);

      } catch (error) {
        alert('error');
      }
    })();
    
  }, []);

    return (
        <div className="content p-40">
        <div className="d-flex align-center mb-40 justify-between">
          <h1>Orders</h1>
          
        </div>

        <div className="d-flex flex-wrap  ">
        {(isLoading ? [...Array(8)] : orders).map((item, index) => (
              <Card 
              key={index}
              loading={isLoading}
              {...item}

            /> 
            ))}
        </div>
      </div>
    );
}

export default Orders;

