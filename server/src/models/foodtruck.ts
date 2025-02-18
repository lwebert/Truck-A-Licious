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
	startDate: string;
	endDate: string;
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
	public startDate!: string;
	public endDate!: string;

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
				unique: true,
			},
			cuisine: {
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
				type: DataTypes.STRING,
				allowNull: false,
                validate: {
                    // isAfter: Foodtruck.createdAt,
                    isDate: true,
                }
			},
			endDate: {
				type: DataTypes.STRING,
				allowNull: false,
                validate: {
                    // isAfter: startDate,
                    isDate: true,
                }
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
