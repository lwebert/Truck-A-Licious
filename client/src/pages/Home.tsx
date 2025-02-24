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
	// const [loggedInOwner, setLoggedInOwner] = useState<UserData | undefined>(
	// 	undefined
	// );

	//check if the user has a foodtruck

	useEffect(() => {
		if (loginCheck) {
			fetchUsers(); //grabs all users, sets to users state variable

			const loggedInUser = auth.getProfile();
			if (
				!loggedInUser ||
				!loggedInUser.id ||
				typeof loggedInUser.id === 'number'
			) {
				console.error('Error retrieving logged in user information');
				return;
			} else {
				setUserId(loggedInUser.id);
				foodtruckcheck(loggedInUser.id);
			}
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

	const foodtruckcheck = async (userid: number) => {
		try {
			const foodtruckData = await retrieveOwnerFoodtruck(userid);

			console.log('Retreive owner foodtruck data: ', foodtruckData);

			if (!foodtruckData) {
				setHasFoodtruck(false);
			} else {
				setFoodtruck(foodtruckData);
				setHasFoodtruck(true);
			}
		} catch (err) {
			console.error('Error retrieving food truck data from user id.', err);
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
