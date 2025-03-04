import { useState, useEffect } from 'react';
import FoodtruckData from '../interfaces/FoodtruckData';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';

interface FoodtruckDisplayProps {
	foodTruck: FoodtruckData | undefined;
	userId: number | null;
}
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

	console.log(
		displayedFoodtruck.startDate,
		displayedFoodtruck.endDate,
		typeof displayedFoodtruck.startDate,
		typeof displayedFoodtruck.endDate
	);
	return (
		<div className="foodtruckInfo">
			<h1 className="foodtruckItem">
				{displayedFoodtruck.foodtruckName}
			</h1>
			<div className="foodtruckDetailContainer">
				<p className="foodtruckItem">
					Cuisine: {displayedFoodtruck.cuisine}
				</p>
				<p className="foodtruckItem">
					Description: {displayedFoodtruck.description}
				</p>
				<p className="foodtruckItem">
					Zip Code: {displayedFoodtruck.zipCode}
				</p>

				{displayedFoodtruck.startDate ? (
					<p className="foodtruckItem">
						Start Date:
						{new Date(
							displayedFoodtruck.startDate
						).toLocaleDateString()}
					</p>
				) : null}
				{displayedFoodtruck.endDate ? (
					<p className="foodtruckItem">
						End Date:{' '}
						{new Date(
							displayedFoodtruck.endDate
						).toLocaleDateString()}
					</p>
				) : null}
				{displayedFoodtruck.menuImg ? (
					<img
						className="foodtruckItem"
						src={displayedFoodtruck?.menuImg}
						alt={`${displayedFoodtruck.foodtruckName} menu`}
					/>
				) : null}
			</div>
		</div>
	);
};

export default FoodtruckDisplay;
