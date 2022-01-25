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

  return (
    <div className="sticky-wrapper">
      <div className="shopping-cart hidden">
        <h2 className="shopping-cart-header">My Cart</h2>
        <div className="cart-items">
          {props.cart.map((item) => {
            console.log(item);
            return (
              <div className="item" key={item.id} id={item.id}>
                <img
                  className="listing-image"
                  src={item.images[0].url_fullxfull}
                  alt="Etsy listing"
                />
                <div className="item-info">
                  <div className="title">{item.title}</div>
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
                </div>
              </div>
            );
          })}
        </div>
        <div className="order-value">
          <div className="subtotal">
            <div className="subtotal-header">Subtotal:</div>
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
          <div className="shipping">
            <div className="shipping-header">Shipping:</div>
            <div className="amount"> TBD</div>
          </div>
          <div className="tax">
            <div className="tax-header">Tax:</div>{" "}
            <div className="amount">TBD</div>
          </div>
          <div className="total">
            <div className="total-header">Order Total:</div>{" "}
            <div className="amount">TBD</div>
          </div>
          <button className="checkout">Checkout</button>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
