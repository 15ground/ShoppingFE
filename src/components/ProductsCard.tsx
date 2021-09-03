import React from "react";
import { IProduct } from "../model/Products";

export default function ProductsCard(props: Props) {
  return <div>
      <p>{props.products.name}</p>
  </div>;
}
interface Props{
  products:IProduct
}