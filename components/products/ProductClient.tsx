"use client";

import { statusSelectOptions } from "@/constants";
import { SelectOption } from "@/interfaces";
import { Category, Material, Product } from "@/types";
import { File, ListFilter, PlusCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import CardTable from "../shared/table/CardTable";
import { ProductColumns } from "../shared/table/Columns";
import { Button } from "../ui/button";
import { DataTable } from "../ui/data-table";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

type ProductClientProps = {
  data: {
    products: Product[];
    categories: Category[];
    materials: Material[];
  };
};

const ProductClient = ({ data }: ProductClientProps) => {
  const { products } = data;
  const [filters, setFilters] = useState<SelectOption[]>(statusSelectOptions);

  const handleFilterChange = (index: number) => {
    setFilters((prevFilters) =>
      prevFilters.map((filter, idx) => ({
        ...filter,
        checked: idx === index,
      })),
    );
  };

  return (
    <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <Tabs defaultValue="all">
        <div className="flex items-center">
          <TabsList>
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="draft">Draft</TabsTrigger>
            <TabsTrigger value="archived" className="hidden sm:flex">
              Archived
            </TabsTrigger>
          </TabsList>
          <div className="ml-auto flex items-center gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="h-8 gap-1">
                  <ListFilter className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                    Filter
                  </span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {filters.map((filter, index) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={filter.checked}
                    onCheckedChange={() => handleFilterChange(index)}
                  >
                    {filter.label}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Button size="sm" variant="outline" className="h-8 gap-1">
              <File className="h-3.5 w-3.5" />
              <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                Export
              </span>
            </Button>
            <Link href={"/products/create/"}>
              <Button size="sm" className="h-8 gap-1">
                <PlusCircle className="h-3.5 w-3.5" />
                <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                  Add Product
                </span>
              </Button>
            </Link>
          </div>
        </div>
        <TabsContent value="all">
          <CardTable
            title={"Products"}
            description={
              "Manage your products and view their sales performance."
            }
            dataTable={
              <DataTable
                columns={ProductColumns}
                data={products}
                selectedRow={undefined}
              />
            }
          />
        </TabsContent>
      </Tabs>
    </main>
  );
};

export default ProductClient;
