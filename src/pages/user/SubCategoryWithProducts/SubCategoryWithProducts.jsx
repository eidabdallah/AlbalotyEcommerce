import React from "react";
import { useParams } from "react-router-dom";
import SubCategories from "../../../components/user/CategorySection/SubCategories/SubCategories.jsx";
import Product from "../../../components/user/Products/Product/Product.jsx";

export default function SubCategoryWithProducts() {
  const { categoryId } = useParams();
  return <>
  <SubCategories id={categoryId} />
  <Product apiPath={`products/productsCategory/${categoryId}`} title={"Product"} />
  </>
}
