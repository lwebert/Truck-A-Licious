//Lauren
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
// import UserList from '../components/Users';
import auth from '../utils/auth';
// import UsersService from '../utils/users';

// import OwnerFoodtruck from './OwnerFoodtruck';
import FoodtruckForm from '../components/FoodtruckForm';
import FoodtruckDisplay from '../components/FoodtruckDisplay';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';
import FoodtruckData from '../interfaces/FoodtruckData';

const Home = () => {
	const [users, setUsers] = useState<UserData[]>([]);
	const [error, setError] = useState<boolean>(false);
	const [loginCheck, setLoginCheck] = useState<boolean>(false);

	const [hasFoodtruck, setHasFoodtruck] = useState<boolean>(false);
	const [userId, setUserId] = useState<number | null>(null);
	const [foodTruck, setFoodtruck] = useState<FoodtruckData | undefined>(
		undefined
	);

	useEffect(() => {
		const initialize = async () => {
			// const loggedInUser = await UsersService.getUserIdByEmail();
			// console.log(loggedInUser);
			// const loggedInUser = 1;
			const loggedInUser = await retrieveUsers();

			if (!loggedInUser) {
				console.error('Error retrieving logged in user information');
				return;
			}
			const userid = await setUserId(loggedInUser.id);
			console.log('UserID setUserId Home page: ', userid);

			const foodtruckData = await retrieveOwnerFoodtruck(userid);

			if (!foodtruckData) {
				setHasFoodtruck(false);
			} else {
				setFoodtruck(foodtruckData);
				setHasFoodtruck(true);
			}
		};

		initialize();
	}, []);

	useEffect(() => {
		if (loginCheck) {
			fetchUsers();
		}
	}, [loginCheck]);

	useLayoutEffect(() => {
		checkLogin();
	}, []);

	const checkLogin = () => {
		if (auth.loggedIn()) {
			console.log('logged in!');
			setLoginCheck(true);
		}
	};

	const fetchUsers = async () => {
		try {
			const data = await retrieveUsers();
			setUsers(data);
		} catch (err) {
			console.error('Failed to retrieve tickets:', err);
			setError(true);
		}
	};

	if (error) {
		return <ErrorPage />;
	}

	console.log(users);
	//TODO: Do all conditional rendering of pages here - including the food truck owners
	return (
		<>
			{
				!loginCheck ? (
					<div className="login-notice">
						<h1>Login to view all your friends!</h1>
					</div>
				) : // TODO: Create state and imports
				hasFoodtruck ? (
					<FoodtruckDisplay userId={userId} foodTruck={foodTruck} />
				) : (
					<FoodtruckForm />
				)
				// <div></div>
				// <FoodtruckForm />
			}
		</>
	);
};

export default Home;
