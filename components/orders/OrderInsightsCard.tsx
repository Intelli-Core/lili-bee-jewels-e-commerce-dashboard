import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import React from "react";

type OrderInsightsCardProps = {
  title: string;
  mainValue: string;
  description: string;
  progressValue: number;
  progressAriaLabel?: string;
};

const OrderInsightsCard = ({
  title,
  mainValue,
  description,
  progressValue,
  progressAriaLabel,
}: OrderInsightsCardProps) => {
  return (
    <Card>
      <CardHeader className="pb-2">
        <CardDescription>{title}</CardDescription>
        <CardTitle className="text-4xl">{mainValue}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-xs text-muted-foreground">{description}</div>
      </CardContent>
      <CardFooter>
        <Progress value={progressValue} aria-label={progressAriaLabel} />
      </CardFooter>
    </Card>
  );
};

export default OrderInsightsCard;
