"use client";

import React from "react";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

type OrderDetailsCardPaginationProps = {
  selectedRow: number;
  setSelectedRow: any;
  totalRows: number;
};

const OrderDetailsCardPagination = ({
  selectedRow,
  setSelectedRow,
  totalRows,
}: OrderDetailsCardPaginationProps) => {
  const handlePrev = () => {
    if (selectedRow > 0) {
      setSelectedRow(selectedRow - 1);
    }
  };

  const handleNext = () => {
    if (selectedRow < totalRows - 1) {
      setSelectedRow(selectedRow + 1);
    }
  };

  return (
    <div className="flex items-center gap-1 ml-auto mr-0 w-auto">
      <Button
        size="icon"
        variant="outline"
        className="h-6 w-6"
        onClick={handlePrev}
        disabled={selectedRow === 0}
      >
        <ChevronLeft className="h-3.5 w-3.5" />
        <span className="sr-only">Previous Order</span>
      </Button>
      <Button
        size="icon"
        variant="outline"
        className="h-6 w-6"
        onClick={handleNext}
        disabled={selectedRow === totalRows - 1}
      >
        <ChevronRight className="h-3.5 w-3.5" />
        <span className="sr-only">Next Order</span>
      </Button>
    </div>
  );
};

export default OrderDetailsCardPagination;
