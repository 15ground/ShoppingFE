import {
  Avatar,
  Box,
  IconButton,
  TextField,
  Typography,
} from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import React from "react";

export default function CartItem(props: Props) {
  return (
    <Box>
      <Avatar variant="rounded" alt="Product's Image" src={props.images} />
      <Typography variant="h5">{props.name}</Typography>
      <Typography variant="h5">{props.price}</Typography>
      <TextField
        style={{ width: "80px" }}
        id="filled-number"
        label="Quantity"
        type="number"
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        defaultValue={props.quantity}
        onChange={(event) =>
          props.changeQuantity(props._id, parseInt(event.target.value))
        }
      />
      <IconButton onClick={() => props.deleteItem(props._id)}>
        <Delete />
      </IconButton>
    </Box>
  );
}
type Props = {
  _id: string;
  name: string;
  images: string;
  price: number;
  quantity: number;
  deleteItem(id: string): void;
  changeQuantity(id: string, quantity: number): void;
};
