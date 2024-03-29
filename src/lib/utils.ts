import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: string) {
  const dateObj = new Date(date)
  return `${dateObj.toLocaleString("en-US", { month: "long" })} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
}