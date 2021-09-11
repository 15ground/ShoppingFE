import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  makeStyles,
  Typography,
} from '@material-ui/core';
import { Add, Delete, Remove } from '@material-ui/icons';
import React from 'react';
import { IProduct } from '../model/Products';

const useStyles = makeStyles({
  content: {
    display: 'flex',
    padding: '10px 0',
    justifyContent: 'space-around',
  },
  images: {
    width: '30%',
    height: 150,
    objectFit: 'cover',
  },
  action: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: 40,
  },
});

export default function CartItem(props: Props) {
  // Make style
  const classes = useStyles();

  return (
    <Container>
      <Divider />
      <Box className={classes.content}>
        <Avatar
          className={classes.images}
          variant="rounded"
          alt="Product's Image"
          src={props.products.images}
        />
        <Box>
          <Typography variant="h5">{props.products.name}</Typography>
          <Box className={classes.action}>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => props.removeFromCart()}
            >
              <Remove />
            </Button>
            <Typography variant="h5">{props.quantity}</Typography>
            <Button
              size="small"
              variant="outlined"
              color="secondary"
              onClick={() => props.addToCart()}
            >
              <Add />
            </Button>
          </Box>
          <IconButton onClick={() => props.deleteItem()}>
            <Delete />
          </IconButton>
        </Box>
      </Box>
      <Divider light />
    </Container>
  );
}
type Props = {
  products: IProduct;
  quantity: number;
  deleteItem(): void;
  addToCart(): void;
  removeFromCart(): void;
};
