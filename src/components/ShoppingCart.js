import { Link } from "react-router-dom";
import "../styles/ShoppingCart.css";
import Close from "@material-ui/icons/Close";

const ShoppingCart = (props) => {
  const onSubtractItemQuantity = (e) => {
    props.onSubtractItemQuantity(e);
  };

  const onAddItemQuantity = (e) => {
    props.onAddItemQuantity(e);
  };

  const onUpdateQuantity = (e) => {
    props.onUpdateQuantity(e);
  };

  const onRemoveItem = (e) => {
    props.onRemoveItem(e);
  };

  const handleToggleCart = () => {
    const shoppingCart = document.querySelector(".shopping-cart");
    shoppingCart.classList.toggle("hidden");
  };

  return (
    <div className="sticky-wrapper">
      <div className="shopping-cart hidden">
        <div className="shopping-cart-header">
          <h2 className="shopping-cart-title">My Cart</h2>
          <Close className="close-cart" onClick={handleToggleCart} />
        </div>
        {props.cart.length === 0 ? (
          <h3 className="cart-message">Your cart is empty!</h3>
        ) : (
          <div className="cart-items">
            {props.cart.map((item) => {
              return (
                <div className="item" key={item.id} id={item.id}>
                  <img
                    className="listing-image"
                    src={item.images[0].url_fullxfull}
                    alt="Etsy listing"
                  />
                  <div className="item-info">
                    <Link to={`/shopping-cart/shop/${item.id}`}>
                      <div className="title">{item.title}</div>
                    </Link>
                    <div className="price">${item.price}</div>
                    <div className="quantity">
                      <button
                        className="subtract-quantity"
                        onClick={onSubtractItemQuantity}
                      >
                        -
                      </button>
                      <input
                        type="text"
                        className="current-quantity"
                        value={item.quantity}
                        onChange={onUpdateQuantity}
                      />
                      <button
                        className="add-quantity"
                        onClick={onAddItemQuantity}
                      >
                        +
                      </button>
                    </div>
                    <div className="remove-item" onClick={onRemoveItem}>
                      Remove
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
        <div className="order-value">
          <div className="subtotal">
            <div className="subtotal-header">SUBTOTAL:</div>
            <div className="amount">
              $
              {parseFloat(
                props.cart.reduce((previousValue, currentItem) => {
                  return (
                    previousValue + currentItem.price * currentItem.quantity
                  );
                }, 0)
              ).toFixed(2)}
            </div>
          </div>
          <div className="shipping">Shipping calculated at checkout</div>
        </div>
        <div className="checkout-buttons">
          <button className="checkout">Continue as a Guest</button>
          <button className="sign-in">Sign In and Checkout</button>
        </div>
        <div className="payment-icons">
          PAYMENT
          <img
            src={require("../assets/Payment-Icons.png")}
            alt="payment-icons"
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
