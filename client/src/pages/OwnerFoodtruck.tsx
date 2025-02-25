// //Lauren
// import { useEffect, useState } from 'react';
// import UsersService from '../utils/users';
// import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';

// import FoodtruckData from '../interfaces/FoodtruckData';
// import FoodtruckForm from '../components/FoodtruckForm';
// import FoodtruckDisplay from '../components/FoodtruckDisplay';

// const OwnerFoodtruck = () => {
// 	const [hasFoodtruck, setHasFoodtruck] = useState<boolean>(false);
// 	const [userId, setUserId] = useState<number | null>(null);
// 	const [foodTruck, setFoodtruck] = useState<FoodtruckData | undefined>(
// 		undefined
// 	);

// 	useEffect(() => {
// 		const initialize = async () => {
// 			// const loggedInUser = await UsersService.getUserIdByEmail();
// 			// console.log(loggedInUser);
// 			const loggedInUser = 1

// 			if (!loggedInUser) {
// 				console.error('Error retrieving logged in user information');
// 				return;
// 			}
// 			setUserId(loggedInUser);

// 			const foodtruckData = await retrieveOwnerFoodtruck(loggedInUser);

// 			if (!foodtruckData) {
// 				setHasFoodtruck(false);
// 			} else {
// 				setFoodtruck(foodtruckData);
// 				setHasFoodtruck(true);
// 			}
// 		};

// 		initialize();
// 	}, []);

// 	return (
// 		<div>
// 			{hasFoodtruck && userId ? (
// 				<FoodtruckDisplay foodTruck={foodTruck} userId={userId} />
// 			) : (
// 				<FoodtruckForm />
// 			)}
// 		</div>
// 	);
// 	return <FoodtruckForm />
// };

// export default OwnerFoodtruck;

// // const profile = AuthService.getProfile();
// // 		if (!profile || !profile.username) {
// // 			throw new Error('Profile not found.');
// // 		}
// // 		const user = await User.findOne({
// // 			where: {
// // 				username: profile.username,
// // 			},
// // 		});
// // 		if (!user) {
// // 			throw new Error('User not found.');
// // 		}
// // 		return user.id;
