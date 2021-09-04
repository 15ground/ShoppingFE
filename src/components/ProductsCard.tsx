import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  makeStyles,
  Typography,
} from "@material-ui/core";
import React from "react";
import { CartItems } from "../model/CartItems";
import { IProduct } from "../model/Products";
import {formatNumber} from "../utils/Format"

const useStyles = makeStyles({
  oot: {
    maxWidth: 345,
  },
  images: {
    height: 250,
  },
  content:{
    fontSize: 16,
  },
  action:{
    float: "right",
    padding: 10
  }
});
export default function ProductsCard(props: Props) {
  const classes = useStyles();

  function callData() {
    var cartItems: CartItems[] = [];
    var jsonCart = localStorage.getItem("cart");
    if (jsonCart != null) {
      cartItems = JSON.parse(jsonCart);
    } else {
      localStorage.setItem("cart", "");
    }
    return cartItems;
  }
  function AddtoCart(idPros: string) {
    var check = false;
    var listCart: CartItems[] = callData();
    // Kiem tra san pham trong gio hang
    listCart.forEach((x) => {
      if (x.id === idPros) {
        ++x.quantity;
        check = true;
      }
      return;
    });
    if (check === false) {
      const newItems: CartItems = {
        id: idPros,
        quantity: 1,
      };
      listCart.push(newItems);
    }
    localStorage.setItem("cart", JSON.stringify(listCart));
    alert("Add to cart successfully!");
  }

  return (
    <Card>
      <CardActionArea>
        <CardMedia
          className={classes.images}
          image={props.products.images}
          title="Contemplative Reptile"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {props.products.name}
          </Typography>
          <Typography gutterBottom variant="body2" color="textSecondary" component="p">
            {props.products.description}
          </Typography>
          <Typography className={classes.content} color="secondary" variant="h6" component="h2">
            {formatNumber(props.products.price)} VND
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Button size="medium" variant="outlined" color="secondary" onClick={()=>AddtoCart(props.products._id)}>
          Mua ngay
        </Button>
      </CardActions>
    </Card>
  );
}
interface Props {
  products: IProduct;

}
