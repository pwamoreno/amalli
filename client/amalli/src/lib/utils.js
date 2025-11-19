import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { holidays } from "@/config";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export function addCommasToNumbers(number) {
  if (number === undefined || number === null) return "0";
  //convert number to string
  let numString = number.toString();

  //use regex to add commas to the string representation of the number
  numString = numString.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return numString;
}

export function getCurrentDateInfo() {
  const now = new Date();
  return {
    year: now.getFullYear(),
    month: now.getMonth() + 1, // 1–12
  };
}


// export function getTodayHolidayMessage() {
//   const today = new Date();
//   const mm = String(today.getMonth() + 1).padStart(2, "0");
//   const dd = String(today.getDate()).padStart(2, "0");
//   const todayKey = `${mm}-${dd}`;

//   const holiday = holidays.find(h => h.date === todayKey);

//   return holiday ? holiday.message : null;
// }

export function getTodayHoliday() {
  const today = new Date();
  const key = today.toISOString().slice(5, 10); // MM-DD format

  const holiday = holidays.find(h => h.date === key);
  return holiday?.message || null;
}

// export function getTodayHoliday() {
//   const today = new Date();
//   const month = today.getMonth();
//   const day = today.getDate();

//   return HOLIDAYS.find(h => h.month === month && h.day === day) || null;
// }