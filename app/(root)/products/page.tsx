import ProductClient from "@/components/products/ProductClient";
import {
  getProductCategories,
  getProductMaterials,
  getProducts,
} from "@/lib/actions/product.actions";

export default async function ProductsPage() {
  const products = await getProducts();
  const categories = await getProductCategories();
  const materials = await getProductMaterials();

  const data = {
    products: products,
    categories: categories,
    materials: materials,
  };

  return <ProductClient data={data} />;
}
