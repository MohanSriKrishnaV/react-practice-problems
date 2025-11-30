import { CartContext } from "./CartContext";
import { useContext } from "react";

export default function Product({ data }) {
  const {
    addToCart,
    removeOne,
    deleteItem,
    cart
  } = useContext(CartContext);

  const itemInCart = cart.find((item) => item.id === data.id);

  return (
    <div>
      <h3>{data.title}</h3>
      <p>Price: ${data.price}</p>
      <p>Rating: {data.rating.rate} ({data.rating.count} reviews)</p>

      <button onClick={() => addToCart(data)}>
        {itemInCart ? "Add More" : "Add to Cart"}
      </button>

      {/** Show quantity and actions only if item is in cart */}
      {itemInCart && (
        <div style={{ marginTop: "8px" }}>
          <span>Qty: {itemInCart.quantity}</span>
          <button onClick={() => removeOne(data)}>-</button>
          <button onClick={() => deleteItem(data)}>Remove</button>
        </div>
      )}
    </div>
  );
}
