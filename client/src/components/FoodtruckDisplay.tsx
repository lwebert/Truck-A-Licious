// import { useState, FormEvent } from 'react';
import { useState, useEffect } from 'react';
import FoodtruckData from '../interfaces/FoodtruckData';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';

interface FoodtruckDisplayProps {
	foodTruck: FoodtruckData | undefined;
	userId: number | null;
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

	//TODO: fix display :)
	return (
		<div>
			<h1>{displayedFoodtruck.foodtruckName}</h1>
			<p>Cuisine: {displayedFoodtruck.cuisine}</p>
			<p>Description: {displayedFoodtruck.description}</p>
			<p>Zip Code: {displayedFoodtruck.zipCode}</p>
			{/* <p>
				Start Date: {displayedFoodtruck.startDate?.toLocaleDateString()}
			</p>
			<p>End Date: {displayedFoodtruck.endDate?.toLocaleDateString()}</p> */}
			{/* <img
				src={displayedFoodtruck?.menuImg}
				alt={`${displayedFoodtruck.foodtruckName} menu`}
			/> */}
		</div>
	);
};

export default FoodtruckDisplay;
