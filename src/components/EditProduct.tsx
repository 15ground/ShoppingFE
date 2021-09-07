import {
  Button,
  FormControl,
  FormGroup,
  Input,
  InputLabel,
  makeStyles,
  Typography,
} from "@material-ui/core";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";

const useStyles = makeStyles({
  container: {
    width: "50%",
    margin: "5% 0 0 25%",
    "& > *": {
      marginTop: 20,
    },
  },
});

const initialValue = {
  name: "",
  images: "",
  price: 0,
  description: "",
};

export default function EditProduct() {
  const [product, setProduct] = useState(initialValue);
  const { name, images, price, description } = product;

  const  {id}: any = useParams();
  console.log(id)
  const classes = useStyles();
  let history = useHistory();

  const onValueChange = (e: any) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };
  const EditProduct = async () => {
    await axios
      .post("http://localhost:3001/api/products/edit/" + id, product)
      .then((result) => {
        console.log(result);
        history.push("../dashboard");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    axios
      .get("http://localhost:3001/api/products/" + id)
      .then((res) => {
        setProduct(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <FormGroup className={classes.container}>
      <Typography variant="h4">Edit Product</Typography>
      <FormControl>
        <InputLabel htmlFor="my-input">Name</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="name"
          value={name}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Images</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="images"
          value={images}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Price</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="price"
          value={price}
          type="number"
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <InputLabel htmlFor="my-input">Description</InputLabel>
        <Input
          onChange={(e) => onValueChange(e)}
          name="description"
          value={description}
          id="my-input"
          aria-describedby="my-helper-text"
        />
      </FormControl>
      <FormControl>
        <Button
          variant="contained"
          color="primary"
          onClick={() => EditProduct()}
        >
          Edit
        </Button>
      </FormControl>
    </FormGroup>
  );
}
