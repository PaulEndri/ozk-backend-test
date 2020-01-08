import Koa from 'koa';
import KoaRouter from 'koa-router';
import bodyParser from 'koa-bodyparser';
import { config } from 'dotenv';
import Routes from './routes';
import AuthMiddleware from './middleware/auth';
import ErrorHandlerMiddleware from './middleware/errorHandler';

config();

const app = new Koa();
const router = new KoaRouter({
	prefix: '/api'
});

Routes.forEach((route) => {
	router[route.method](route.path, route.action);
});

app.use(bodyParser());
app.use(ErrorHandlerMiddleware);
app.use(AuthMiddleware);
app.use(router.routes());
app.use(router.allowedMethods());
export default app;
