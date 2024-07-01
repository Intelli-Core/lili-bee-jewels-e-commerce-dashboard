"use server";

import { Customer, Order } from "@/types";

async function createorder(customer: Customer, order: Order): Promise<Order> {
  const orderUrl = `${process.env.DOMAIN}/order/`;
  // If no order exists, create a new one
  const orderResponse = await fetch(orderUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      customer: customer,
      order: order,
    }),
    cache: "no-cache",
  });

  if (!orderResponse.ok) {
    throw new Error("Failed to create order");
  }

  const orderData = await orderResponse.json();
  return orderData;
}

async function getOrders(): Promise<Order[]> {
  // await new Promise((resolve) => setTimeout(resolve, 1000));

  const url = `${process.env.DOMAIN}/order/`;

  const response = await fetch(url, {
    cache: "no-cache",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  const data = await response.json();

  return data;
}

export { createorder, getOrders };
