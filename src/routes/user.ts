import IRoute from '../interfaces/route';
import { UserController } from '../controllers/user';

const UserRoutes = (controller: UserController): IRoute[] => [
	{ method: 'get', path: '/user', action: controller.getAll },
	{ method: 'get', path: '/user/:id', action: controller.get },
	{ method: 'post', path: '/user', action: controller.post },
	{ method: 'patch', path: '/user/:id', action: controller.patch },
	{ method: 'put', path: '/user/:id', action: controller.put }
];

export default UserRoutes;
