import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPhoneDisplay(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 11 && digits.startsWith("09")) {
    return `${digits.slice(0, 4)} ${digits.slice(4, 7)} ${digits.slice(7)}`;
  }
  return phone;
}

export function formatTelLink(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.startsWith("0")) return `+98${digits.slice(1)}`;
  if (digits.startsWith("98")) return `+${digits}`;
  return `+98${digits}`;
}
