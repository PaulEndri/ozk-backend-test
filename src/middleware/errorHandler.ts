import { Context, Next } from 'koa';

const ErrorHandlerMiddleware = async (context: Context, next: Next) => {
	try {
		await next();
	} catch (e) {
		context.throw(e.status || 500, e);
	}
};

export default ErrorHandlerMiddleware;
