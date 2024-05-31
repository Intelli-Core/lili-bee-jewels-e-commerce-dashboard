import MetricCard from "@/components/shared/MetricCard";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { metricCardsContent } from "@/constants";
import { ArrowUpRight, Package } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <div className="grid gap-4 md:grid-cols-2 md:gap-8 lg:grid-cols-4">
        {metricCardsContent.map((metric, index) => {
          return (
            <MetricCard
              key={index}
              title={metric.title}
              mainValue={metric.mainValue}
              description={metric.description}
              icon={metric.icon}
            />
          );
        })}
      </div>
      <div className="grid gap-4 md:gap-8 lg:grid-cols-2 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-center">
            <div className="grid gap-2">
              <CardTitle>Transactions</CardTitle>
              <CardDescription>
                Recent transactions from your store.
              </CardDescription>
            </div>
            <Button asChild size="sm" className="ml-auto gap-1">
              <Link href="#">
                View All
                <ArrowUpRight className="h-4 w-4" />
              </Link>
            </Button>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Customer</TableHead>
                  <TableHead className="hidden xl:table-column">
                    Product
                  </TableHead>
                  <TableHead className="hidden xl:table-column">SKU</TableHead>
                  <TableHead className="text-right">Amount</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <div className="font-medium">Liam Johnson</div>
                    <div className="hidden text-sm text-muted-foreground md:inline">
                      liam@example.com
                    </div>
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Product Name
                  </TableCell>
                  <TableCell className="hidden xl:table-column">
                    Product SKU
                  </TableCell>
                  <TableCell className="text-right">$250.00</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-01-chunk-5">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
          </CardHeader>
          <CardContent className="grid gap-8">
            <div className="flex items-center gap-4">
              <Package className="h-4 w-4" />
              <div className="grid gap-1">
                <p className="text-sm font-medium leading-none">Product Name</p>
                <p className="text-sm text-muted-foreground">
                  Product Category
                </p>
              </div>
              <div className="ml-auto font-medium">+$1,999.00</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
