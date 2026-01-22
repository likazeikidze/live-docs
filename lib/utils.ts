import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function timeAgo(date: Date | string): string {
  const now = new Date();
  const created = new Date(date);

  const diffMs = now.getTime() - created.getTime();
  const diffMinutes = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMinutes / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMinutes < 1) return "created just now";
  if (diffMinutes < 60) return `created ${diffMinutes} min ago`;
  if (diffHours < 24)
    return `created ${diffHours} hour${diffHours > 1 ? "s" : ""} ago`;

  return `created ${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}
