import React, { useEffect, useState } from "react";
import { DataGrid } from "@material-ui/data-grid";
import axios from "axios";
import {
  Container,
  IconButton,
  makeStyles,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from "@material-ui/core";
import { IProduct } from "../model/Products";
import { Delete, Edit } from "@material-ui/icons";

const useStyles = makeStyles({
  root: {
    width: "100vw",
    height: "100vh",
    paddingTop: 5,
    marginTop: 100,
  },
  title: {
    textAlign: "center",
    fontWeight: 600,
  },
  content: {
    textAlign: "center",
  },
});

export default function AdminPage() {
  const classes = useStyles();

  const [products, setProducts] = useState<IProduct[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(3);

  const handleChangePage = (event: any, nextPage: any) => {
    setPage(nextPage)
  };
  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(event.target.value);
  };
  //   Load data
  const loadProducts = async () => {
    await axios
      .get("http://localhost:3001/api/products")
      .then((res) => {
        setProducts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // Side effects
  useEffect(() => {
    loadProducts();
  }, []);
  console.log(products);

  return (
    <Container className={classes.root}>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.title}>Name</TableCell>
              <TableCell className={classes.title}>Images</TableCell>
              <TableCell className={classes.title}>Price</TableCell>
              <TableCell className={classes.title}>Description</TableCell>
              <TableCell className={classes.title}>Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((product) => (
                <TableRow>
                  <TableCell className={classes.content}>
                    {product.name}
                  </TableCell>
                  <TableCell className={classes.content}>
                    <img
                      src={product.images}
                      style={{ width: "80px", height: "80px" }}
                      alt="data"
                    />
                  </TableCell>
                  <TableCell className={classes.content}>
                    {product.price}
                  </TableCell>
                  <TableCell className={classes.content}>
                    {product.description}
                  </TableCell>
                  <TableCell className={classes.content}>
                    <IconButton>
                      <Edit />
                    </IconButton>
                    <IconButton>
                      <Delete />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[3, 5, 10, 25]}
          component="div"
          count={products.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </TableContainer>
    </Container>
  );
}
