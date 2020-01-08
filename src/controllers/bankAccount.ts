import { Context } from 'koa';
import { BankAccountService } from '../service/bankAccount';
import { TransferService } from '../service/transfer';
import { BankAccount } from '../models';

export class BankAccountController {
	public async get(context: Context) {
		try {
			const accountId = context.params.id;

			if (!accountId) {
				context.body = {
					message: 'No Account Id Specified'
				};
				context.throw(400);
				return;
			}

			const account = await BankAccount.findOne({
				where: {
					id: accountId
				}
			});

			if (account) {
				context.body = account.toJSON();
			} else {
				context.body = {
					message: `Account ${accountId} not found`
				};

				context.throw(404);
			}
		} catch (e) {
			context.body = {
				message: e
			};

			context.throw(400);
		}
	}

	public async transfer(context: Context) {
		const { sourceId, destinationId } = context.params;
		const { amount } = context.request.body;

		const sourceAccount = await BankAccountService.getAccount(sourceId);
		const destinationAccount = await BankAccountService.getAccount(destinationId);

		if (!sourceAccount || !destinationAccount) {
			context.throw(404, {
				message: `${!sourceAccount ? 'Source' : 'Destination'} account not found`
			});
			return;
		}

		const transferService = new TransferService(sourceAccount, destinationAccount);

		try {
			const results = await transferService.transfer(amount);

			context.body = results.toJSON();
		} catch (e) {
			context.throw(400, e);
		}
	}
}
