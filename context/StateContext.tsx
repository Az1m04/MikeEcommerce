import React, { createContext, useContext, useState, useEffect } from "react";

import { toast } from "react-hot-toast";

const Context = createContext<any>("");

export const StateContext = ({ children }: any) => {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<any>([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [qty, setQty] = useState(1);

  let foundProduct: any;
  let index: any;

  const onAdd = (product: any, quantity: any) => {
    const checkProductInCart = cartItems?.find(
      (item: any) => item?._id === product?._id
    );
    setTotalPrice((prev: any) => prev + product?.price * quantity);
    setTotalQuantity((prev: any) => prev + quantity);
    if (checkProductInCart) {
      const updatedCartItems: any = cartItems?.map((item: any) => {
        if (item._id === product._id)
          return { ...item, quantity: item?.quantity + quantity };
      });
      setCartItems(updatedCartItems);
    } else {
      product.quantity = quantity;
      setCartItems([...cartItems, { ...product }]);
    }
    toast.success(`${qty} ${product?.name} added to cart.`);
  };

  const onRemove = (product: any) => {
    foundProduct = cartItems?.find((item: any) => item?._id === product?._id);
    const newCartItem = cartItems?.filter(
      (item: any) => item._id !== product?._id
    );
    setTotalPrice((prev) => prev - foundProduct?.price * foundProduct?.quantity);
    setTotalQuantity((prev) => prev - foundProduct?.quantity);
    setCartItems(newCartItem);
  };
  const toggleCartItemQuantity = (id: any, value: any) => {
    foundProduct = cartItems?.find((item: any) => item._id === id);
    index = cartItems?.findIndex((product: any) => product._id === id);
    const newCartItem = cartItems?.filter((item: any) => item._id !== id);
    if (value === "inc") {
     cartItems[index]={ ...foundProduct, quantity: foundProduct?.quantity + 1 }
        
      setTotalPrice((prev) => prev + foundProduct?.price);
      setTotalQuantity((prev) => prev + 1);
    } else if (value === "desc") {
      if (foundProduct?.quantity > 1) {
      
        cartItems[index]=
          { ...foundProduct, quantity: foundProduct?.quantity - 1 }
      
        setTotalPrice((prev) => prev - foundProduct?.price);
        setTotalQuantity((prev) => prev - 1);
      }
    }
  };

  const inQty = () => {
    setQty((prev) => prev + 1);
  };
  const decQty = () => {
    setQty((prev) => {
      if (prev - 1 < 1) return 1;
      return prev - 1;
    });
  };

  return (
    <Context.Provider
      value={{
        showCart,
        setShowCart,
        cartItems,
        totalPrice,
        totalQuantity,
        qty,
        inQty,
        decQty,
        onAdd,
        toggleCartItemQuantity,
        onRemove,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export const useStateContext = () => useContext(Context);
