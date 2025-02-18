import {
	Model,
	DataTypes,
	type Sequelize,
	type Optional,
	type ForeignKey,
} from 'sequelize';

import type { User } from './user.js';

interface FoodtruckAttributes {
	id: number;
	foodtruckName: string;
	cuisine: string;
	zipCode: number;
	startDate: Date;
	endDate: Date;
}

interface FoodTruckCreationAttributes
	extends Optional<FoodtruckAttributes, 'id'> {}

export class Foodtruck
	extends Model<FoodtruckAttributes, FoodTruckCreationAttributes>
	implements FoodtruckAttributes
{
	public id!: number;
	public foodtruckName!: string;
	public cuisine!: string;
	public zipCode!: number;
	public startDate!: Date;
	public endDate!: Date;

	declare userId: ForeignKey<User['id']>;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

//TODO: add user type to model
export function FoodtruckFactory(sequelize: Sequelize): typeof Foodtruck {
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
			},
			cuisine: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			zipCode: {
				type: DataTypes.NUMBER,
				allowNull: false,
			},
			startDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
			endDate: {
				type: DataTypes.DATE,
				allowNull: false,
			},
		},
		{
			tableName: 'foodtrucks',
			sequelize,
		}
	);

	return Foodtruck;
}
