import { BankAccount } from '../models';

export class TransferService {
	constructor(private sourceAccount: BankAccount, private destinationAccount: BankAccount) {}

	private validateSourceAccount(account: BankAccount, amount: number) {
		console.log(amount, account.toJSON());
		return account.Amount >= amount && account.Enabled;
	}

	public async validateTransfer(amount: number) {
		const { sourceAccount } = this;

		if (!this.validateSourceAccount(sourceAccount, amount)) {
			//return 'Invalid Source Account';
			return false;
		}

		return true;
	}

	public async transfer(amount: number, skipValidation = false) {
		const { sourceAccount, destinationAccount } = this;

		if (!skipValidation) {
			const validTransfer = await this.validateTransfer(amount);

			if (!validTransfer) {
				throw new Error('Criteria for Transfer is Invalid');
			}
		}

		sourceAccount.Amount -= amount;
		destinationAccount.Amount += amount;

		await sourceAccount.save();
		await destinationAccount.save();

		return sourceAccount;
	}
}
