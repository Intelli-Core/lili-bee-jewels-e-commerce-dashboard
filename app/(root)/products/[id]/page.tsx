import ProductEditClient from "@/components/products/ProductEditClient";
import {
  getProductById,
  getProductCategories,
} from "@/lib/actions/product.actions";
import { getPlaceholderImage } from "@/lib/imageUtils";

export default async function EditProductPage({
  params,
}: {
  params: { id: string };
}) {
  const productResponse = await getProductById(params.id);
  const categoriesResponse = await getProductCategories();
  const productThumbnail = await getPlaceholderImage(productResponse.thumbnail);
  const product = {
    ...productResponse,
    thumbnail: productThumbnail,
  };
  return (
    <ProductEditClient product={product} categories={categoriesResponse} />
  );
}
