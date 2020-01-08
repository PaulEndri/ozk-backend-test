import UserRoutes from './user';
import { UserController } from '../controllers/user';
import IRoute from '../interfaces/route';
import { BankAccountController } from '../controllers/bankAccount';
import BankAccountRules from './bankAccount';

const userController = new UserController();
const bankAccountController = new BankAccountController();

const Routes: IRoute[] = [
	...UserRoutes(userController),
	...BankAccountRules(bankAccountController)
];

export default Routes;
