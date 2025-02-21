import { useEffect, useState } from 'react';

import { retrieveUsers } from '../api/userAPI';

import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';

import FoodtruckData from '../interfaces/FoodtruckData';
import FoodtruckForm from '../components/FoodtruckForm';
import FoodtruckDisplay from '../components/FoodtruckDisplay';

const OwnerFoodtruck = () => {
	const [hasFoodtruck, setHasFoodtruck] = useState<boolean>(false);
	const [userId, setUserId] = useState<string>('');

	const [foodTruck, setFoodtruck] = useState<FoodtruckData | undefined>({
		id: null,
		foodtruckName: '',
		cuisine: '',
		menuImg: '',
		description: '',
		zipCode: null,
		startDate: new Date(),
		endDate: new Date(),
	});

	useEffect(() => {
		const initialize = async () => {
			const loggedInUser = await retrieveUsers();

			if (!loggedInUser || !loggedInUser.id) {
				console.error('Error retrieving logged in user information');
			}

			const userID = await setUserId(loggedInUser.id);
			return userID;
		};

		initialize().then((userID) => {
			const data = retrieveOwnerFoodtruck(userID);

			if (!data) {
				setHasFoodtruck(false);
			}

			setHasFoodtruck(true);
		});
	}, []);

	return (
		<div>
			{hasFoodtruck ? (
				<FoodtruckDisplay userId={userId} />
			) : (
				<FoodtruckForm />
			)}
		</div>
	);
};

//separately make 2 food truck componts - conditionally render
export default OwnerFoodtruck;
