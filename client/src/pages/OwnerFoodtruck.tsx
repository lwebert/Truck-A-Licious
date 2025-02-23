//Lauren
import { useEffect, useState } from 'react';
import { retrieveUsers } from '../api/userAPI';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';

import FoodtruckData from '../interfaces/FoodtruckData';
import FoodtruckForm from '../components/FoodtruckForm';
import FoodtruckDisplay from '../components/FoodtruckDisplay';

const OwnerFoodtruck = () => {
	const [hasFoodtruck, setHasFoodtruck] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>('');
	// const [userFoodtruckId, setUserFoodtruckId] = useState<string>('');

	const [foodTruck, setFoodtruck] = useState<FoodtruckData | undefined>(
		undefined
	);

	useEffect(() => {
		const initialize = async () => {
			const loggedInUser = await retrieveUsers();

			if (!loggedInUser || !loggedInUser.id) {
				console.error('Error retrieving logged in user information');
				return;
			}

			setUserId(loggedInUser.id);

			const foodtruckData = await retrieveOwnerFoodtruck(loggedInUser.id);
			if (!foodtruckData) {
				setHasFoodtruck(false);
			} else {
				setFoodtruck(foodtruckData);
				setHasFoodtruck(true);
			}
		};

		initialize();
	}, []);

	return (
		<div>
			{hasFoodtruck ? (
				<FoodtruckDisplay foodTruck={foodTruck} userId={userId} />
			) : (
				<FoodtruckForm />
			)}
		</div>
	);
};

export default OwnerFoodtruck;
