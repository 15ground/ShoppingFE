import { Box, Divider } from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { CartItems } from "../model/CartItems";
import { IProduct } from "../model/Products";

export default function Cart() {
    // Manage state
  const [cartItems, setCartItems] = useState<CartItems[]>([]);

  const [listProducts, setListProducts] = useState<IProduct[]>([]);

  const [priceCart, setpriceCart] = useState(0);

  const findByID = (id: string) => {
    let product: IProduct =
      listProducts.find((item) => {
        return item._id === id;
      }) || ({} as IProduct);
    return product;
  };

  // Load products
  const loadProductsData = () => {
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setListProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
// Load cart
  const loadCartData = () => {
    let totalPrice = 0;
    // load local
    let items: CartItems[] = [];
    let listItem = localStorage.getItem("cart");
    if (listItem != null) {
      items = JSON.parse(listItem);
    }
    // load danh sach item
    setCartItems(items);
    // tinh gia
    items.forEach((cartItem: CartItems) => {
      var id = cartItem.id;
      let quantity = cartItem.quantity;

      let products = listProducts.find((v: IProduct) => v._id === id);

      let price = products?.price || 0;

      totalPrice += price * quantity;
    });
    setpriceCart(totalPrice);
  };
  // load data lan dau
  useEffect(() => {
    loadProductsData();
  }, []);
  // khi danh sach product da load xong
  useEffect(() => {
    loadCartData();
  }, [listProducts]);
  return (
    <Box>
      {cartItems.map((items: any) => {
        let product = findByID(items.id);
        return (
          <CartItem
            _id={items.id}
            name={product.name}
            images={product.images}
            price={product.price}
            quantity={items.quantity}
            deleteItem={(thisID) => {
              let dataCart = cartItems;
              let index = dataCart.findIndex((items) => items.id === thisID);
              dataCart.splice(index, 1);
              localStorage.setItem("cart", JSON.stringify(dataCart));
              setCartItems(dataCart);
              loadCartData();
            }}
            changeQuantity={(thisID, quantity) => {
              let changeCount = cartItems.slice();
              let index = changeCount.findIndex((x) => x.id === thisID);
              if (quantity < 0) {
                changeCount.splice(index, 1);
                setCartItems(changeCount);
                localStorage.setItem("cart", JSON.stringify(changeCount));
              } else {
                changeCount[index].quantity = quantity;
                setCartItems(changeCount);
                localStorage.setItem("cart", JSON.stringify(changeCount));
                loadCartData();
              }
            }}
          />
        );
      })}
      <Divider light />
    </Box>
  );
}
