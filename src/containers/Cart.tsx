import { Box, makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CartItem from '../components/CartItem';
import TotalPrice from '../components/TotalPrice';
import { CartItems } from '../model/CartItems';
import { IProduct } from '../model/Products';
import { useAppDispatch, useAppSelector } from '../store.hooks';
import {
  addToCart,
  getCartItems,
  getTotalPrice,
  removeFromCart,
  deleteFromCart,
} from './cart.slice';

const useStyles = makeStyles({
  title: {
    display: 'flex',
    fontSize: 20,
    fontWeight: 500,
    paddingBottom: 10,
  },
});

export default function Cart() {
  // Make style
  const classes = useStyles();
  // Dispatch action
  const dispatch = useAppDispatch();
  const addToCartHandler = (product: IProduct) => {
    dispatch(addToCart(product));
  };
  const removeFromCartHandler = (productId: string) =>
    dispatch(removeFromCart(productId));
  const deleteFromCartHandler = (productId: string) =>
    dispatch(deleteFromCart(productId));
  // Get data from Redux
  const CartItems = useAppSelector(getCartItems);
  const total = useAppSelector(getTotalPrice);
  return (
    <Box>
      <Typography className={classes.title} variant="h5">
        Your order
      </Typography>
      {CartItems.length === 0 ? <p>No items in cart</p> : null}
      {CartItems.map((items) => {
        return (
          <CartItem
            key={items._id}
            products={items}
            quantity={items.quantity}
            addToCart={() => addToCartHandler(items)}
            removeFromCart={() => removeFromCartHandler(items._id)}
            deleteItem={() => deleteFromCartHandler(items._id)}
          />
        );
      })}
      <TotalPrice totalPrice={total} />
    </Box>
  );
}
