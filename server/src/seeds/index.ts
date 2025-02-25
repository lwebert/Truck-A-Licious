import { seedUsers } from './user-seeds.js';
import sequelize from '../config/connection.js';
import { Foodtruck } from '../models/index.js';

const seedAll = async (): Promise<void> => {
	try {
		await sequelize.sync({ force: true });
		console.log('\n----- DATABASE SYNCED -----\n');

		const userSeeds = await seedUsers();
		console.log('\n----- USERS SEEDED -----\n');

		for (const user of userSeeds) {
			const endDate1 = new Date();
			endDate1.setDate(new Date().getDate() + 7);

			// const endDate2 = new Date();
			// endDate2.setDate(new Date().getDate() + 7);

			await Foodtruck.create({
				foodtruckName: 'Test' + user.id,
				cuisine: 'Tacos',
				zipCode: 68164,
				startDate: new Date(),
				endDate: endDate1,
				description: 'great food!',
				UserId: user.id,
			});
		}

		// await seedFoodtrucks();
		console.log('\n----- FOODTRUCKS SEEDED -----\n');

		process.exit(0);
	} catch (error) {
		console.error('Error seeding database:', error);
		process.exit(1);
	}
};

seedAll();
