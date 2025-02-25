//Lauren
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
// import UsersService from '../utils/users';

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

    // useEffect(() => {
	// 	if (loginCheck) {
	// 		fetchUsers();
	// 	}
	// }, [loginCheck]);


    // Try #2:
	useEffect(() => {
		if (loginCheck) {
			fetchUsers(); //grabs all users, sets to users state variable

			const loggedInUser = auth.getProfile();
			// if (
			// 	!loggedInUser ||
			// 	!loggedInUser.id ||
			// 	typeof loggedInUser.id === 'number'
			// ) 
            console.log(typeof loggedInUser.id)


            if (
				!loggedInUser ||
				!loggedInUser.id ||
				typeof loggedInUser.id !== 'number'
			) {
				console.error('Error retrieving logged in user information');
				return;
			} else {
				setUserId(loggedInUser.id);
				foodtruckcheck(loggedInUser.id);
                // setUserId(loggedInUser.id);
				// foodtruckcheck(loggedInUser.id);
			}
		}
	}, [loginCheck]);

    //--Try #3:
	// useEffect(() => {
	// 	if (loginCheck) {
	// 		fetchUsers(); //grabs all users, sets to users state variable
	// 	}
	// }, [loginCheck]);

	// useEffect(() => {
	// 	const retrieveUserId = async () => {
	// 		const userid = await UsersService.getUserIdByUsername();
	// 		setUserId(userid);
	// 	};
	// 	retrieveUserId();
	// }, []);

	// useEffect(() => {
	// 	if (userId !== null) {
	// 		foodtruckcheck(userId);
	// 	}
	// }, [userId]);




//TODO: Listen for FoodtruckForm.tsx handleSubmit event here
    const foodtruckSubmit = () => {
        setHasFoodtruck(true);
    }


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
			console.error(
				'Error retrieving food truck data from user id.',
				err
			);
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
						<h1>Foodtrucks coming to your area!</h1>
						<div>
						<div>Monday</div>
						<div>Tuesday</div>
						<div>Wed</div>
						<div>Th</div>
						<div>Fr</div>
					</div>

				</div>
				) : // TODO: Create state and imports
				hasFoodtruck ? (
					<FoodtruckDisplay userId={userId} foodTruck={foodTruck} />
				) : (
					<FoodtruckForm userId={userId} foodtruckSubmit={foodtruckSubmit}/>
				)
			}
		</>
	);
};

export default Home;
