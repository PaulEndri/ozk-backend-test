import { BankAccount } from '../models';

export class BankAccountService {
	static async getAccount(accountNumber: number) {
		try {
			const bankAccount = await BankAccount.findOne({
				where: {
					id: accountNumber
				}
			});

			return bankAccount;
		} catch (e) {
			// use winston or some third party logging
			throw new Error('Unable to get accounts');
		}
	}
}
