import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function httpGet<T>(url: string): Promise<T> {
  return fetch(import.meta.env.VITE_API_BASE_URL + url).then((res) => res.json());
}

export function timestampToDate(timestamp: number) {
  const date = new Date(timestamp * 1000);
  const dateString = date.toLocaleDateString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric' });
  const timeString = date.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' });
  return `${dateString} - ${timeString}`;
}