import { CartContext } from "./CartContext";
import { useContext, useEffect } from "react";

export default function Logo() {
  const {
    cart,
    addToCart,
    removeOne,
    deleteItem,
    totalItems,
    totalPrice
  } = useContext(CartContext);


 

  return (
    <>
      <h3>Total Price: ₹{totalPrice.toFixed(2)}</h3>

      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul>
          {cart.map((item) => (
            <li key={item.id}>
              {item.title} — Qty: {item.quantity}

              <button onClick={() => addToCart(item)}>+</button>
              <button
                onClick={() => removeOne(item)}
                disabled={item.quantity === 1}
              >
                -
              </button>
              <button onClick={() => deleteItem(item)}>Remove</button>
            </li>
          ))}
        </ul>
      )}

      <h4>Total Items: {totalItems}</h4>
    </>
  );
}
