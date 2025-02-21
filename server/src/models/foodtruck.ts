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
    menuImg?: string;
	description: string;
	zipCode: number; //then use API to autofill city/state
    //use calendar api wiht dropdown menu - choose dates?
	startDate: Date;
	endDate: Date;

	//TODO: Output - city, state
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
    public menuImg?: string;
	public description!: string;
	public zipCode!: number;
	public startDate!: Date;
	public endDate!: Date;

	declare userId: ForeignKey<User['id']>;

	public readonly createdAt!: Date;
	public readonly updatedAt!: Date;
}

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
            menuImg: {
				type: DataTypes.STRING,
				allowNull: true,
                validate: {
                    isUrl: true,
                }
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
