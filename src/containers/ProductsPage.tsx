import {
  CircularProgress,
  Container,
  Grid,
  makeStyles,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import ProductsCard from "../components/ProductsCard";
import { IProduct } from "../model/Products";

// Make style with MUI
const useStyle = makeStyles({
  root: {
    marginTop: 20,
    paddingTop: 100
  },
  lazy: {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function ProductsPage() {
  // MUI styles
  const classes = useStyle();

  // Manage state
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoadding] = useState(false);

  //   Load data
  const loadProducts = () => {
    setLoadding(true);
    axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data.data);
        console.log(res.data.data)
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
  console.log(products)

  return (
    // Container chua products
    <Container>
      <Grid container spacing={2} className={classes.root}>
        {loading ? (
          <div className={classes.lazy}>
            <CircularProgress size="5px" thickness={5} />
          </div>
        ) : (
          products.map((product) => (
            <Grid item key={product._id} sm={3} xs={12}>
              <ProductsCard products={product}/>
            </Grid>
          ))
        )}
      </Grid>
    </Container>
  );
}
