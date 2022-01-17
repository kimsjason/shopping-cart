import "../styles/ShoppingCart.css";

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

  console.log(props.cart);
  return (
    <div className="shopping-cart hidden">
      <h2 className="shopping-cart-header">My Cart</h2>
      <div className="cart-items">
        {props.cart.map((item) => {
          return (
            <div className="item">
              <div className="title">{item.title}</div>
              <div className="price">{item.price}</div>
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
                <button className="add-quantity" onClick={onAddItemQuantity}>
                  +
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="subtotal">Subtotal</div>
      <div className="shipping">Shipping</div>
      <div className="tax">Tax</div>
      <div className="total">Order Total</div>
      <button className="checkout">Checkout</button>
    </div>
  );
};

export default ShoppingCart;
