import { useState, FormEvent } from 'react';
import FoodtruckData from '../interfaces/FoodtruckData';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';

const FoodtruckDisplay: React.FC<FoodtruckData> = () => {
	const [foodtruck, setFoodtruck] = useState<FoodtruckData>({
		id: null,
		foodtruckName: null,
		cuisine: null,
		menuImg: null,
		description: null,
		zipCode: null,
		startDate: new Date(),
		endDate: new Date(),
	});

	const findUserFoodtruck = async () => {
		try {
			const foodtruckdata = await retrieveOwnerFoodtruck(body);
			return foodtruckdata;
		} catch (err) {
			console.error('Failed to render foodtruck data for user', err);
		}
	};
};

export default FoodtruckDisplay;
