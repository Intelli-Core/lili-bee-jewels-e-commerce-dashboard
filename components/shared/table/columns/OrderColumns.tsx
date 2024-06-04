"use client";

import { Badge } from "@/components/ui/badge";
import { formatDateTime } from "@/lib/utils";
import { Order } from "@/types";
import { ColumnDef } from "@tanstack/react-table";

export const OrderColumns: ColumnDef<Order>[] = [
  {
    accessorKey: "customer.profile.full_name",
    header: "Customer",
  },
  {
    accessorKey: "status",
    header: () => <div className="hidden md:table-cell">Status</div>,
    cell: ({ row }) => {
      return (
        <div className="hidden md:table-cell">
          <Badge className="text-xs" variant={"secondary"}>
            {row.getValue("status")}
          </Badge>
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: () => <div className="hidden md:table-cell">Date</div>,
    cell: ({ row }) => {
      const dateString = row.getValue("created_at");
      return (
        <div className="hidden md:table-cell">{formatDateTime(dateString)}</div>
      );
    },
  },
  {
    accessorKey: "total",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
];
