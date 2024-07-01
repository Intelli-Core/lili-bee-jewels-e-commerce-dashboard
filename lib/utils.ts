import { ErrorResponse } from "@/types";
import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDateTime(
  dateTime: any,
  includeTime: boolean = false,
): string {
  const dateObject = new Date(dateTime);

  const formattedDate =
    (dateObject.getMonth() + 1).toString().padStart(2, "0") +
    "-" +
    dateObject.getDate().toString().padStart(2, "0") +
    "-" +
    dateObject.getFullYear();

  if (!includeTime) {
    return formattedDate;
  }

  const formattedTime =
    dateObject.getHours().toString().padStart(2, "0") +
    ":" +
    dateObject.getMinutes().toString().padStart(2, "0") +
    ":" +
    dateObject.getSeconds().toString().padStart(2, "0");

  return `${formattedDate} ${formattedTime}`;
}

export function formatCurrency(amount: string): string {
  const parsedAmount = parseFloat(amount);
  const formatted = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(parsedAmount);

  return formatted;
}

export function fileToArrayBuffer(file: File): Promise<ArrayBuffer> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as ArrayBuffer);
    reader.onerror = () => reject(reader.error);
    reader.readAsArrayBuffer(file);
  });
}

export function imageBlobGenerator(base64: string): Blob {
  // Decode the Base64 string and create a Blob
  const byteCharacters = atob(base64.split(",")[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/jpeg" });

  return blob;
}

export function generateRandomString(length: number): string {
  let result = "";
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const validateImage = (
  file: File,
  callback: (isValid: boolean, errorMessage?: string) => void,
) => {
  if (file.size > 5 * 1024 * 1024) {
    callback(false, "Files must be less than 5 MB.");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    const image = new Image();
    image.onload = () => {
      if (image.width !== image.height) {
        callback(false, "Only 1x1 images are accepted.");
        return;
      }

      callback(true);
    };
    image.onerror = () => {
      callback(false, "The file could not be read as an image.");
    };
    image.src = e.target?.result as string;
  };
  reader.onerror = () => {
    callback(false, "There was an error read the file.");
  };
  reader.readAsDataURL(file);
};

export function capitalizeErrorMessages(
  errorResponse: ErrorResponse,
): ErrorResponse {
  const capitalizedErrors: ErrorResponse = {};

  for (const key in errorResponse) {
    if (errorResponse.hasOwnProperty(key)) {
      capitalizedErrors[key] = errorResponse[key].map((error) => {
        return error.charAt(0).toUpperCase() + error.slice(1);
      });
    }
  }

  return capitalizedErrors;
}
