import { Container, ERROR_MIDDLEWARE } from '@decorators/express';

export function ServerErrorMiddleware(error: Error, request: Request, response: Response, next: any) {
    next();
}