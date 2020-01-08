import { sequelize } from './sqlize';
import app from './server';

(async () => {
	await sequelize.sync();

	app.listen(process.env.SERVER_PORT, () => {
		console.log(`Server running port ${process.env.SERVER_PORT}`);
	});
})();
