import ProductCreateClient from "@/components/products/create/ProductCreateClient";
import { getProductCategories } from "@/lib/actions/product.actions";
import React from "react";

export default async function ProductCreatePage() {
  const categories = await getProductCategories();

  return <ProductCreateClient categories={categories} />;
}
