import Modal from "../Layout/Modal";
import CartItem from "./CartItem";
import classes from "./Cart.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../store/cartSlice";

const Cart = (props) => {
  const dispatch = useDispatch();
  // getting Context data
  const cartRedux = useSelector((state) => state.cart);
  // making total amount to last two decimal numbers
  const totalAmount = `$${cartRedux.totalAmount.toFixed(2)}`;
  const numberOfCartItems = cartRedux.items.reduce((curNumber, item) => {
    return curNumber + item.quantity;
  }, 0);

  //checking cart is empty or not
  const hasItems = cartRedux.items.length > 0;
  // function for removing item which get id as argument and redirect to cotext action
  const cartItemRemoveHandler = (id) => {
    dispatch(cartActions.removeFromCart(id));
  };
  // function for adding Item which get item as argument and redirect to addItem context action and only increase 1 quantity
  const cartItemAddHandler = (item) => {
    dispatch(cartActions.addItemToCart({ ...item, quantity: 1 }));
  };
  // function for reset Item which set state to defaultstate
  const resetItemsHandler = () => {
    dispatch(cartActions.cartReset());
  };
  // get items from context and map over them to show in cart and cartItem components
  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartRedux.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          quantity={item.quantity}
          price={item.price}
          img={item.image}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  // wrap it in Modal for making overlay
  return (
    <Modal onClose={props.onClose}>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      <div className={classes.actions}>
        {!(numberOfCartItems === 0) && (
          <button
            className={classes["button--alt"]}
            onClick={resetItemsHandler}
          >
            Reset
          </button>
        )}
        <button className={classes["button--alt"]} onClick={props.onClose}>
          Close
        </button>
        {hasItems && <button className={classes.button}>Order</button>}
      </div>
    </Modal>
  );
};

export default Cart;
