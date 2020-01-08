import { Context, Next } from 'koa';

type RouteMethods = 'get' | 'delete' | 'post' | 'put' | 'patch';

export default interface IRoute {
	path: string;
	method: RouteMethods;
	action: (context: Context, next: Next) => Promise<any>;
};
