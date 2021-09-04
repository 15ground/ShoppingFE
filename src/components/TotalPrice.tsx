import { Box, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import { formatNumber } from "../utils/Format";

const useStyles = makeStyles({
  title:{
    display: "flex",
    justifyContent: "space-around",
    marginLeft: -25
  }
})

export default function TotalPrice(props: Props) {
  const classes = useStyles();
  return (
    <Box className={classes.title}>
      <Typography variant="h5">Total: </Typography>
      <Typography variant="h5">{formatNumber(props.totalPrice)} VND</Typography>
    </Box>
  );
}
type Props = {
  totalPrice: number;
};
