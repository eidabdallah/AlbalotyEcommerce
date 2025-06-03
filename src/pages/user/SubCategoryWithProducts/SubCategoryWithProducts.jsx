import React from "react";
import { useParams } from "react-router-dom";
import Products from "../../../components/user/Products/Products.jsx";
import SubCategories from "../../../components/user/CategorySection/SubCategories/SubCategories.jsx";

export default function SubCategoryWithProducts() {
  const { categoryId } = useParams();
  return <>
  <SubCategories id={categoryId} />
  <Products id={categoryId} />
  </>
}
