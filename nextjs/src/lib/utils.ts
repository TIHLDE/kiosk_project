import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { Purchase } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function filterPurchasesTo2025(data: Purchase[]){
  const cutoff = new Date("2025-01-01T00:00:00.000+00:00");

  return(data.filter((prop: Purchase) => {
    const date = new Date(formatTimestamp(prop.timestamp));
    return date > cutoff;
  }));
}

export function formatTimestamp(timestamp: string){
  return timestamp.replace(/([+-]\d{2})(\d{2})$/, "$1:$2");
}