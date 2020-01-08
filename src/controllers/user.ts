import { Context } from 'koa';
import { User, BankAccount } from '../models';

export class UserController {
	static BATCH_FIELDS: (keyof User)[] = [
		'FirstName',
		'LastName',
		'Address1',
		'Address2',
		'AddressCity',
		'AddressState',
		'AddressCountry'
	];

	public async getAll(context: Context) {
		// query params come in as strings, default to string values
		const { pageSize = '10', pageNumber = '0' } = context.query;

		const data = await User.findAll({
			raw: true,
			limit: +pageSize,
			offset: +pageSize * +pageNumber
		});

		context.body = data;
	}

	public async get(context: Context) {
		const { id } = context.params;

		if (!id) {
			context.throw(400, {
				message: 'User ID is Missing'
			});

			return;
		}

		const user = await User.findOne({
			where: {
				id
			},
			include: [ BankAccount ]
		});

		if (user) {
			context.body = user.toJSON();
		} else {
			context.throw(404, {
				message: 'User Not Found'
			});
		}
	}

	public async post(context: Context) {
		const userData = context.request.body;

		const data = await User.create(userData);

		context.body = data.toJSON();
	}

	public async patch(context: Context) {
		const { body } = context.request;
		const { id } = context.params;

		const user = await User.findOne({
			where: {
				id
			}
		});

		if (!user) {
			context.throw(404, {
				message: 'User not found'
			});

			return;
		}

		const valuesToPersist: Partial<User> = {};

		UserController.BATCH_FIELDS.forEach((field) => {
			if (body[field] !== undefined) {
				valuesToPersist[field] = body[field];
			}
		});

		await user.update({ ...valuesToPersist });
	}

	public async put(context: Context) {
		const { body } = context.request;
		const { id } = context.params;

		const user = await User.findOne({
			where: {
				id
			}
		});

		if (!user) {
			context.throw(404, {
				message: 'User not found'
			});

			return;
		}

		const valuesToPersist: Partial<User> = {};

		UserController.BATCH_FIELDS.forEach((field) => (valuesToPersist[field] = body[field]));

		await user.update({ ...valuesToPersist });
	}

	public async delete(context: Context) {
		const { id } = context.params;

		const user = await User.findOne({
			where: {
				id
			}
		});

		if (!user) {
			context.throw(404, {
				message: 'User not found'
			});

			return;
		}

		await user.destroy();

		context.body = {
			message: 'success'
		};
	}
}
