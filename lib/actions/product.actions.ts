"use server";

import { ICreateProductAttributes } from "@/interfaces";
import {
  ApiResponse,
  Attributes,
  Category,
  ErrorResponse,
  Material,
  Product,
} from "@/types";
import { capitalizeErrorMessages } from "../utils";

const jwt = `${process.env.JWT_TESTING}`;

async function getProducts(limit: number = 100): Promise<Product[]> {
  const url = `${process.env.DOMAIN}/product/?limit=${limit}&?sort=newest`;

  const response = await fetch(url, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

async function getProductById(id: string): Promise<Product> {
  const url = `${process.env.DOMAIN}/product/${id}/`;

  const response = await fetch(url, { next: { revalidate: 3600 } });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

async function getProductCategories(): Promise<Category[]> {
  const url = `${process.env.DOMAIN}/product/category/`;

  const response = await fetch(url, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

async function getProductMaterials(): Promise<Material[]> {
  const url = `${process.env.DOMAIN}/product/material/`;

  const response = await fetch(url, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to create product!");
  }

  const data = await response.json();

  return data;
}

async function createProduct(
  formData: FormData,
): Promise<ApiResponse<Product>> {
  const url = `${process.env.DOMAIN}/product/`;

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
      body: formData,
    });

    if (!response.ok) {
      const errorData: ErrorResponse = await response.json();
      return { data: null, errors: capitalizeErrorMessages(errorData) };
    }

    const data: Product = await response.json();
    return { data, errors: null };
  } catch (error) {
    return { data: null, errors: { general: [error.message] } };
  }
}

// async function updateProduct(id: string): Promise<Product> {
//   const url = `${process.env.DOMAIN}/product/${id}/`;
//
//   const updateProductResponse = await fetch(url, {
//     method: "PATCH",
//     headers: {
//       "Content-type": ""
//     }
//   })
//
//   const data: Product = {};
//   return data;
// }

async function deleteProduct(id: string) {
  const url = `${process.env.DOMAIN}/product/${id}/`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
    cache: "no-cache",
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error data:", errorData);
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }
}

async function archiveProduct(id: string) {}

async function createProductAttributes(
  attributes: ICreateProductAttributes,
): Promise<Attributes> {
  const url = `${process.env.DOMAIN}/product/attributes/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      weight: attributes.weight,
      material: "01ae2b7a-8c59-4bc6-a579-9dfc7d9a9d13",
    }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    console.error("Error data:", errorData);
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  const data: Attributes = await response.json();

  return data;
}

export {
  createProduct,
  createProductAttributes,
  deleteProduct,
  getProductById,
  getProductCategories,
  getProductMaterials,
  getProducts,
};
