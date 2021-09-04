import { Box, Divider, makeStyles, Typography } from "@material-ui/core";
import { findByLabelText } from "@testing-library/react";
import axios from "axios";
import React, { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import TotalPrice from "../components/TotalPrice";
import { CartItems } from "../model/CartItems";
import { IProduct } from "../model/Products";

const useStyles = makeStyles({
  title:{
    display: "flex",
    fontSize: 20,
    fontWeight: 500,
    paddingBottom: 10
  }
})

export default function Cart() {
  // Make style
  const classes = useStyles();

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
    console.log(cartItems.length);
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


  /* Side Effect */
  // Load data lan dau
  useEffect(() => {
    loadProductsData();
  }, []);
  // Khi danh sach product da load xong
  useEffect(() => {
    loadCartData();
  }, [listProducts]);

  return (
    <Box>
      <Typography className={classes.title} variant="h5">Your order</Typography>
      {cartItems.length === 0 ? <p>No items in cart</p> : null}
      {cartItems.map((items: any) => {
        let product = findByID(items.id);
        return (
          <CartItem
            key={items.id}
            _id={items.id}
            name={product.name}
            images={product.images}
            price={product.price}
            quantity={items.quantity}
            addToCart={(thisID) => {
              let changeCount = [...cartItems];
              let index = changeCount.findIndex((x) => x.id === thisID);
              changeCount[index].quantity += 1;
              setCartItems(changeCount);
              localStorage.setItem("cart", JSON.stringify(changeCount));
              loadCartData();
            }}
            removeFromCart={(thisID) => {
              let changeCount = [...cartItems];
              let index = changeCount.findIndex((x) => x.id === thisID);
              if (changeCount[index].quantity < 1) {
                changeCount.splice(index, 1);
                setCartItems(changeCount);
                localStorage.setItem("cart", JSON.stringify(changeCount));
              } else {
                changeCount[index].quantity -= 1;
                setCartItems(changeCount);
                localStorage.setItem("cart", JSON.stringify(changeCount));
                loadCartData();
              }
            }}
            deleteItem={(thisID) => {
              let dataCart = [...cartItems];
              let index = dataCart.findIndex((items) => items.id === thisID);
              dataCart.splice(index, 1);
              localStorage.setItem("cart", JSON.stringify(dataCart));
              setCartItems(dataCart);
              loadCartData();
            }}
          />
        );
      })}
      <TotalPrice totalPrice={priceCart} />
    </Box>
  );
}
