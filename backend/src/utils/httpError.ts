import type { ApiError } from "../types/index.js";

export const httpError = (status: number, message: string): ApiError => {
  const error = new Error(message) as ApiError;
  error.status = status;
  return error;
};
