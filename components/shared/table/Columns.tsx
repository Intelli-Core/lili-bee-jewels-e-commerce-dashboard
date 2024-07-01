"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { formatDateTime } from "@/lib/utils";
import { Order, Product } from "@/types";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import { useDeleteProduct } from "@/hooks";
import { AlertDialog, AlertDialogTitle, AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader
} from "@/components/ui/alert-dialog";
import Link from "next/link";

type ActionsCellProps = {
  id: string;
  deleteMessage: string;
  useDeleteHook: () => (id: string) => Promise<void>;
}

const ActionsCell = ({ id, deleteMessage, useDeleteHook }: ActionsCellProps) => {
  const handleDelete = useDeleteHook();

  return (
    <div className="flex w-[50px]">
      <AlertDialog>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem asChild className="cursor-pointer">
              <Link href={`/products/${id}`}>
                Edit
              </Link>
            </DropdownMenuItem>
            <AlertDialogTrigger asChild>
              <DropdownMenuItem className="cursor-pointer">
                Delete
              </DropdownMenuItem>
            </AlertDialogTrigger>
          </DropdownMenuContent>
        </DropdownMenu>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              {deleteMessage}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={() => handleDelete(id)}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

// Order columns

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

// Product columns

export const ProductColumns: ColumnDef<Product>[] = [
  {
    accessorKey: "thumbnail",
    header: () => (
      <div className="hidden w-[100px] sm:table-cell">
        <span className="sr-only">Image</span>
      </div>
    ),
    cell: ({ row }) => {
      return (
        <div className="hidden sm:table-cell">
          <Image
            alt="Product image"
            className="aspect-square rounded-md object-cover"
            height="64"
            src={
              row.getValue("thumbnail")
                ? row.getValue("thumbnail")
                : "/assets/images/placeholders/image-placeholder.svg"
            }
            width="64"
          />
        </div>
      );
    },
  },
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "status",
    header: () => <div>Status</div>,
    cell: ({ row }) => {
      return (
        <Badge className="text-xs" variant={"outline"}>
          {row.getValue("status")}
        </Badge>
      );
    },
  },
  {
    accessorKey: "price",
    header: ({ column }) => <div className="hidden md:table-cell text-left">
      <DataTableColumnHeader column={column} title={"Price"} />
    </div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("price"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="hidden md:table-cell text-left font-medium">
          {formatted}
        </div>
      );
    },
  },
  {
    accessorKey: "created_at",
    header: ({ column }) => <div className="hidden md:table-cell"><DataTableColumnHeader column={column} title="Created at" /></div>,
    cell: ({ row }) => {
      const dateString = row.getValue("created_at");
      return (
        <div className="hidden md:table-cell">
          {formatDateTime(dateString, true)}
        </div>
      );
    },
  },
  {
    id: "actions",
    header: () => <span className="sr-only">Actions</span>,
    cell: ({ row }) => {
      const product = row.original;
      return <ActionsCell id={product.id}
        deleteMessage="This action cannot be undone. 
        This will permanently delete the product from our servers."
        useDeleteHook={useDeleteProduct} />;
    },
  },
];
