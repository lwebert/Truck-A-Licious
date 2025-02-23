// import { useState, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import FoodtruckData from '../interfaces/FoodtruckData';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';

interface FoodtruckDisplayProps {
	foodTruck: FoodtruckData | undefined;
	userId: number;
}
//TODO: put user query inside this component rather than OwnerFoodtruck
const FoodtruckDisplay: React.FC<FoodtruckDisplayProps> = ({
	foodTruck,
	userId,
}) => {
	const [displayedFoodtruck, setDisplayedFoodtruck] = useState<
		FoodtruckData | undefined
	>(foodTruck);

	useEffect(() => {
		const findUserFoodtruck = async () => {
			try {
				const foodtruckdata = await retrieveOwnerFoodtruck(userId);
				setDisplayedFoodtruck(foodtruckdata);
			} catch (err) {
				console.error('Failed to render foodtruck data for user', err);
			}
		};

		if (userId) {
			findUserFoodtruck();
		}
	}, [userId]);

	if (!displayedFoodtruck) {
		return <div>No food truck found.</div>;
	}

	return (
		<div>
			<h1>{displayedFoodtruck.foodtruckName}</h1>
			<p>Cuisine: {displayedFoodtruck.cuisine}</p>
			<p>Description: {displayedFoodtruck.description}</p>
			<p>Zip Code: {displayedFoodtruck.zipCode}</p>
			<p>
				Start Date: {displayedFoodtruck.startDate?.toLocaleDateString()}
			</p>
			<p>End Date: {displayedFoodtruck.endDate?.toLocaleDateString()}</p>
			{/* <img
				src={displayedFoodtruck?.menuImg}
				alt={`${displayedFoodtruck.foodtruckName} menu`}
			/> */}
		</div>
	);

	// const [foodtruck, setFoodtruck] = useState<FoodtruckData>({
	// 	id: null,
	// 	foodtruckName: null,
	// 	cuisine: null,
	// 	menuImg: null,
	// 	description: null,
	// 	zipCode: null,
	// 	startDate: new Date(),
	// 	endDate: new Date(),
	// });

	// const findUserFoodtruck = async () => {
	// 	try {
	// 		const foodtruckdata = await retrieveOwnerFoodtruck();
	// 		return foodtruckdata;
	// 	} catch (err) {
	// 		console.error('Failed to render foodtruck data for user', err);
	// 	}
	// };
};

export default FoodtruckDisplay;
