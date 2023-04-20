import React, { Fragment } from "react";
import ProductCard from "./ProductCard";

const ProductsList = ({ data }) => {
  return (
    <Fragment>
      {data?.map((item, index) => (
        <ProductCard item={item} key={index} />
      ))}
    </Fragment>
  );
};

export default ProductsList;
