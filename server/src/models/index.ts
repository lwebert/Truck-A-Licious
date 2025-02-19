import sequelize from '../config/connection.js';
import { UserFactory } from './user.js';
import { FoodtruckFactory } from './foodtruck.js';

const User = UserFactory(sequelize);
const Foodtruck = FoodtruckFactory(sequelize);

User.hasOne(Foodtruck, {
	onDelete: 'CASCADE',
});
Foodtruck.belongsTo(User);

export { User, Foodtruck };
