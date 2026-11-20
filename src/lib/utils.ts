import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(date: string | Date | null | undefined): string {
  if (!date) return "Not specified";
  const d = typeof date === "string" ? new Date(date) : date;
  return d.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

export function formatImprisonment(min: number | null | undefined, max: number | null | undefined, unit: string = "years"): string {
  if (min == null && max == null) return "No statutory imprisonment term specified";
  if (min != null && max != null) {
    if (min === max) return `${max} ${unit}`;
    return `${min} to ${max} ${unit}`;
  }
  if (max != null) return `Up to ${max} ${unit}`;
  return `Minimum ${min} ${unit}`;
}

export function formatFine(min: number | null | undefined, max: number | null | undefined, currency: string = "USD", fineType?: string): string {
  if (min == null && max == null) return fineType || "Fine not specifically capped / at judicial discretion";
  
  const fmt = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency || "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  if (min != null && max != null) {
    if (min === max) return fmt(max);
    return `${fmt(min)} to ${fmt(max)}`;
  }
  if (max != null) return `Up to ${fmt(max)}`;
  return `Minimum ${fmt(min!)}`;
}
