import { Sequelize } from 'sequelize-typescript';
import * as models from './models';
import { config } from 'dotenv';

config();

export const sequelize = new Sequelize({
	dialect: 'mysql',
	database: process.env.SQL_DATABASE,
	username: process.env.SQL_USERNAME,
	password: process.env.SQL_PASSWORD,
	host: process.env.SQL_HOSTNAME,
	models: Object.values(models)
});
