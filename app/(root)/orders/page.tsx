import OrderClient from "@/components/orders/OrderClient";
import { getOrders } from "@/lib/actions/order.actions";
import React from "react";

export default async function OrdersPage() {
  const orders = await getOrders();

  return <OrderClient data={orders} />;
}
