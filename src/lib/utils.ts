import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function capitalize(strWithWords: string) {
  const replaceRegex = /(_|-)/g;
  const str = strWithWords.replace(replaceRegex, " ");
  const words = str.split(" ");

  const capitalizedWords = words.map(
    (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase(),
  );

  return capitalizedWords.join(" ");
}
