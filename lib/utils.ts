import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(dateTime: string): string {
  const dateObject = new Date(dateTime);

  const formattedDate =
    (dateObject.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    dateObject.getDate().toString().padStart(2, "0") +
    "-" +
    dateObject.getFullYear();

  return formattedDate;
}

export function formatCurrency(amount: string): string {
  const parsedAmount = parseFloat(amount);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parsedAmount);

  return formatted;
}
