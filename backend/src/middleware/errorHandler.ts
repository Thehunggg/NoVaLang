import type { ErrorRequestHandler, RequestHandler } from "express";
import type { ApiError } from "../types/index.js";

export const notFoundHandler: RequestHandler = (request, _response, next) => {
  const error = new Error(`Route ${request.method} ${request.originalUrl} was not found.`) as ApiError;
  error.status = 404;
  next(error);
};

export const errorHandler: ErrorRequestHandler = (error: ApiError, _request, response, _next) => {
  const status = error.status ?? 500;
  if (status >= 500) console.error(error);
  response.status(status).json({ error: status === 500 ? "Internal server error." : error.message, status });
};
