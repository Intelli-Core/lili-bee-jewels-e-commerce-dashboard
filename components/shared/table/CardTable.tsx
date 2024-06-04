import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import React from "react";

type CardTableProps = {
  title: string;
  description: string;
  dataTable: React.ReactNode;
};

const CardTable = ({ title, description, dataTable }: CardTableProps) => {
  return (
    <Card>
      <CardHeader className="px-7">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{dataTable}</CardContent>
    </Card>
  );
};

export default CardTable;
