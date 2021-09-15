import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
  IconButton,
  Drawer,
} from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import ProductsCard from '../components/ProductsCard';
import { IProduct } from '../model/Products';
import { AddShoppingCart } from '@material-ui/icons';
import Cart from './Cart';
// Make style with MUI
const useStyles = makeStyles({
  root: {
    marginTop: 100,
  },
  lazy: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cart: {
    top: 10,
    right: 20,
    position: 'fixed',
    zIndex: 9999,
    color: 'white',
  },
  list: {
    width: 480,
    padding: 20,
    textAlign: 'center',
  },
});

export default function ProductsPage() {
  // MUI styles
  const classes = useStyles();

  // Manage state
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoadding] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);

  //   Load data
  const loadProducts = async () => {
    setLoadding(true);
    await axios
      .get('http://localhost:8080/api/products')
      .then((res) => {
        setProducts(res.data);
        setLoadding(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Side effects
  useEffect(() => {
    loadProducts();
  }, []);

  return (
    // Container chua products
    <Container className={classes.root}>
      <Drawer
        classes={{ paper: classes.list }}
        anchor="right"
        open={cartOpen}
        onClose={() => setCartOpen(false)}
      >
        <Cart />
      </Drawer>
      <IconButton className={classes.cart} onClick={() => setCartOpen(true)}>
        <AddShoppingCart />
      </IconButton>
      <Grid container spacing={3}>
        {loading ? (
          <div className={classes.lazy}>
            <CircularProgress size="3rem" thickness={5} />
          </div>
        ) : (
          products.map((product) => (
            <Grid item key={product.id} sm={3} xs={12}>
              <ProductsCard products={product} />
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
