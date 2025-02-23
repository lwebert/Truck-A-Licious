//Lauren
import { Foodtruck } from '../models/index.js';

// import { format } from 'date-fns';

export const seedFoodtrucks = async () => {
	await Foodtruck.bulkCreate(
		[
			{
				foodtruckName: 'Test1',
				cuisine: 'Tacos',
				zipCode: 68164,
				// startDate: format(new Date(2025, 2, 20), 'MM/dd/yyy'),
				// endDate: format(new Date(2025, 2, 22), 'MM/dd/yyy'),
				startDate: '',
				endDate: '',
				description: '',
			},
			{
				foodtruckName: 'Test2',
				cuisine: 'Corn dogs',
				zipCode: 55447,
				// startDate: format(new Date(2025, 2, 20), 'MM/dd/yyy'),
				// endDate: format(new Date(2025, 2, 22), 'MM/dd/yyy'),
				startDate: '',
				endDate: '',
				description: '',
			},
		],
		{ individualHooks: true }
	);
};
