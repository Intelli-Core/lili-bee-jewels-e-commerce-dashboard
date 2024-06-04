"use client";

import React, { useState } from "react";
import OrderDetailsCard from "@/components/orders/OrderDetailsCard";
import OrderDetailsCardPagination from "@/components/orders/OrderDetailsCardPagination";
import OrderInsightsCard from "@/components/orders/OrderInsightsCard";
import CardTable from "@/components/shared/table/CardTable";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { OrderColumns } from "../shared/table/Columns";

type OrderClientProps = {
  data: any;
};

const OrderClient = ({ data }: OrderClientProps) => {
  const [selectedRow, setSelectedRow] = useState(0);
  const table = (
    <DataTable columns={OrderColumns} data={data} selectedRow={selectedRow} />
  );

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3 max-h-min">
      <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
          <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
            <CardHeader className="pb-3">
              <CardTitle>Your Orders</CardTitle>
              <CardDescription className="max-w-lg text-balance leading-relaxed">
                Introducing Our Dynamic Orders Dashboard for Seamless Management
                and Insightful Analysis.
              </CardDescription>
            </CardHeader>
            <CardFooter>
              <Button>Create New Order</Button>
            </CardFooter>
          </Card>
          <OrderInsightsCard
            title={"This Week"}
            mainValue={"$1,329"}
            description={"+25% from last week"}
            progressValue={25}
          />
          <OrderInsightsCard
            title={"This Month"}
            mainValue={"$5,329"}
            description={"+10% from last month"}
            progressValue={25}
          />
        </div>
        <CardTable
          title={"Orders"}
          description={"Recent orders from your store"}
          dataTable={table}
        />
      </div>
      <OrderDetailsCard
        order={data[selectedRow]}
        pagination={
          <OrderDetailsCardPagination
            selectedRow={selectedRow}
            setSelectedRow={setSelectedRow}
            totalRows={data.length}
          />
        }
      />
    </main>
  );
};

export default OrderClient;
