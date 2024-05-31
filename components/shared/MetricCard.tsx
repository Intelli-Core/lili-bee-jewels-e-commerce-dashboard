import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

type MetricCardProps = {
  title: string;
  icon?: React.ReactNode;
  mainValue: string;
  description: string;
};

const MetricCard = ({
  title,
  icon,
  mainValue,
  description,
}: MetricCardProps) => {
  return (
    <Card x-chunk="dashboard-01-chunk-0">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {icon}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{mainValue}</div>
        <p className="text-xs text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
