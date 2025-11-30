import { useEffect, useState } from "react";
import { CartContext } from "./CartContext";

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on first mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart"));
    if (storedCart) setCart(storedCart);
  }, []);

  // Recalculate totals when cart updates
  useEffect(() => {
    let items = 0;
    let price = 0;

    cart.forEach(item => {
      items += item.quantity;
      price += item.price * item.quantity;
    });

    setTotalItems(items);
    setTotalPrice(price);

    // localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prevCart => {
      const exists = prevCart.find(item => item.id === product.id);

      if (exists) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }

      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeOne = (product) => {
    setCart(prevCart =>
      prevCart
        .map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
        .filter(item => item.quantity > 0)
    );
  };

  const deleteItem = (product) => {
    setCart(prevCart =>
      prevCart.filter(item => item.id !== product.id)
    );
  };

  return (
    <CartContext.Provider value={{
      cart,
      addToCart,
      removeOne,
      deleteItem,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};
