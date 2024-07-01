"use client";

import { deleteProduct } from "@/lib/actions/product.actions";
import { useRouter } from "next/navigation";

export const useDeleteProduct = () => {
  const router = useRouter();

  const handleDelete = async (productId: string) => {
    try {
      await deleteProduct(productId);
      router.refresh(); // Update this with your desired path
    } catch (error) {
      console.error("Failed to delete product:", error);
    }
  };

  return handleDelete;
};
