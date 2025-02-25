//Lauren
import {
	Model,
	type InferAttributes,
	type InferCreationAttributes,
	type CreationOptional,
	DataTypes,
	type Sequelize,
	type ForeignKey,
} from 'sequelize';

import type { User } from './user.js';

export class Foodtruck extends Model<
	InferAttributes<Foodtruck>,
	InferCreationAttributes<Foodtruck>
> {
	declare id: CreationOptional<number>;
	declare foodtruckName: string;
	declare cuisine: string;
	declare menuImg: CreationOptional<string>;
	declare description: string;
	declare zipCode: number;
	declare startDate: Date;
	declare endDate: Date;

	declare UserId: ForeignKey<User['id']>;
}

export function FoodtruckFactory(sequelize: Sequelize) {
	Foodtruck.init(
		{
			id: {
				type: DataTypes.INTEGER,
				autoIncrement: true,
				primaryKey: true,
			},
			foodtruckName: {
				type: DataTypes.STRING,
				allowNull: false,
				unique: true,
			},
			cuisine: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			menuImg: {
				type: DataTypes.STRING,
				allowNull: true,
				// validate: {
				// 	isUrl: true,
				// },
			},
			description: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			zipCode: {
				type: DataTypes.INTEGER,
				allowNull: false,
				validate: {
					min: 23,
				},
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					// isAfter: Foodtruck.createdAt,
					isDate: true,
				},
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
				validate: {
					// isAfter: startDate,
					isDate: true,
				},
			},
		},
		{
			tableName: 'foodtrucks',
			sequelize,
			// timestamps: false,
		}
	);

	return Foodtruck;
}
