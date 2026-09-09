export const API_URL =
  import.meta.env.VITE_API_URL ||
  "http://localhost:5000/api";

export const ORDER_STATUSES = [
  "Processing",
  "Confirmed",
  "Shipped",
  "Delivered",
  "Cancelled",
];

export const PAYMENT_METHODS = [
  "COD",
  "CARD",
  "UPI",
];