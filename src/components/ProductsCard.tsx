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
import { IProduct } from "../model/Products";

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
          <Typography className={classes.content} color="secondary" gutterBottom variant="h6" component="h2">
            {props.products.price} VND
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {props.products.description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions className={classes.action}>
        <Button size="medium" variant="outlined" color="secondary">
          Buy now
        </Button>
      </CardActions>
    </Card>
  );
}
interface Props {
  products: IProduct;
}
