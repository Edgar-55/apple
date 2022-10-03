import React from 'react';
import axios from 'axios';

import Info from "../Info";
import { useCart } from '../../hooks/useCart';

import styles from './Drawer.module.scss'



const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

function Drawer({ onClose, onRemove, items = [], opened }) {
  const { cartItems, setCartItems, totalPrice } = useCart();
  const [orderId, setOrderId] = React.useState(null);
  const [isOrderComplete, setIsOrderComplete] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(false);



  const onClickOrder = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.post('https://62a743e797b6156bff8b6ea6.mockapi.io/orders', {
        items: cartItems,
      });
      
      setOrderId(data.id);
      setIsOrderComplete(true);
      setCartItems([]);

      for (let i = 0; i < cartItems.length; i++) {
        const item = cartItems[i];
        await axios.delete('https://62a743e797b6156bff8b6ea6.mockapi.io/cart' + item.id );
        await delay(5000);
      }
    } catch (error) {
        alert('Error');
    }
    setIsLoading(false);
  };

  return (

    <div className={`${styles.overlay} ${opened ? styles.overlayVisible : ''}`}>

      <div className={styles.drawer}>
        <h2 className="d-flex justify-between mb-30">Cart <img onClick={onClose} className="cu-p" src="/img/btn-remove.svg" alt="Close" />
        </h2>

        {items.length > 0 ? (
          <div className="d-flex flex-column flex">
            <div className="items flex">
              {items.map((obj) => (
                <div key={obj.id} className="cartItem d-flex align-center mb-20">
                  <div
                    style={{ backgroundImage: `url(${obj.imageUrl})` }}
                    className="cartItemImg"></div>

                  <div className="mr-20 flex">
                    <p className="mb-5">{obj.title}</p>
                    <b>{obj.price} USD</b>
                  </div>
                  <img
                    onClick={() => onRemove(obj.id)}
                    className="removeBtn"
                    src="img/btn-remove.svg"
                    alt="Remove"
                  />
                </div>
              ))}
            </div>
            <div className="cartTotalBlock">
              <ul>
                <li>
                  <span>Total:</span>
                  <div></div>
                  <b>{totalPrice} USD </b>
                </li>
                <li>
                  <span>Tax 5%:</span>
                  <div></div>
                  <b>{totalPrice /100 * 5} USD </b>
                </li>
              </ul>
              <button disabled={isLoading} onClick={onClickOrder} className="greenButton">
              Checkout <img src="img/arrow.svg" alt="Arrow" />
              </button>
            </div>
          </div>
        ) : (
          <Info
            title={isOrderComplete ? "Order is processed!" : "Cart is empty"}
            description={isOrderComplete ? `Your order #${orderId} will soon be handed over to courier delivery` : "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."}
            image={isOrderComplete ? "/img/complete-order.jpg" : "/img/empty-cart.jpg"}
          />

        )}
      </div>
    </div>

  );
}

export default Drawer;