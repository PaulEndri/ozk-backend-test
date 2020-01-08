import { Context, Next } from 'koa';
import { ApiAuthorization } from '../models';

const AuthMiddleware = async (context: Context, next: Next) => {
	const apiKey = context.request.headers['x-api-key'];

	if (!apiKey) {
		context.throw(403, {
			message: 'X-API-KEY must be present'
		});
	}
	const decodedString = Buffer.from(apiKey, 'base64').toString('binary');
	const [ UserName, Password ] = decodedString.split(':');

	const apiAuth = await ApiAuthorization.findAll({
		where: {
			UserName,
			Password
		}
	});

	if (!apiAuth) {
		context.body = {
			message: 'Not Allowed'
		};
		context.throw(403);
	} else {
		return next();
	}
};

export default AuthMiddleware;
