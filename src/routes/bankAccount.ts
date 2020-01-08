import IRoute from '../interfaces/route';
import { BankAccountController } from '../controllers/bankAccount';

const BankAccountRules = (controller: BankAccountController): IRoute[] => [
	{
		method: 'post',
		path: '/bankaccounts/:sourceId/transfer/:destinationId',
		action: controller.transfer
	}
];

export default BankAccountRules;
