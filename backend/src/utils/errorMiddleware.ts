import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';

interface IHTTPError extends Partial<Error> {
  code?: string;
  message: string;
  statusCode?: number;
  status: string;
}

export class HTTPError extends Error {
  public code: string;
  public message: string;
  public statusCode: number;
  public readonly name = 'HTTPError' as const;

  public constructor(code = 'http_error', message = 'Bad request', statusCode = 400) {
    super(message);

    this.code = code;
    this.message = message;
    this.statusCode = statusCode;
  }
}

const isHttpError = (err: Error): err is HTTPError => err.name === 'HTTPError';

const ErrorMiddleware: ErrorRequestHandler = async (
  err: Error | HTTPError,
  req: Request,
  res: Response,
  // must keep it here, otherwise ErrorMiddleware is not considered as an ErrorRequestHandler
  _: NextFunction
): Promise<Response> => {
  console.error('ErrorMiddleware', err);

  if (isHttpError(err)) {
    return res.status(err.statusCode).json({
      status: 'error',
      errorCode: err.code,
      message: err.message,
    });
  }

  const errorObj: IHTTPError = {
    status: 'error',
    message: 'Internal server error',
  };

  return res.status(500).json(errorObj);
};

export default ErrorMiddleware;
