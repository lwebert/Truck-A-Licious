//Lauren
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
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
		if (loginCheck) {
			fetchUsers();
		}
	}, [loginCheck]);


    //Try #2:
	// useEffect(() => {
	// 	if (loginCheck) {
	// 		fetchUsers(); //grabs all users, sets to users state variable

	// 		const loggedInUser = auth.getProfile();
	// 		// if (
	// 		// 	!loggedInUser ||
	// 		// 	!loggedInUser.id ||
	// 		// 	typeof loggedInUser.id === 'number'
	// 		// ) 
    //         if (
	// 			!loggedInUser ||
	// 			!loggedInUser.username ||
	// 			typeof loggedInUser.username === 'string'
	// 		) {
	// 			console.error('Error retrieving logged in user information');
	// 			return;
	// 		} else {
	// 			setUserId(loggedInUser.username);
	// 			foodtruckcheck(loggedInUser.username);
    //             // setUserId(loggedInUser.id);
	// 			// foodtruckcheck(loggedInUser.id);
	// 		}
	// 	}
	// }, [loginCheck]);

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
						<h1 className="hp-Tittle ">Foodtrucks coming to your area!</h1>
						<div className='hp-container'>
						<div className='hp-card1'>
							<h2>Monday</h2>
								<ul>
								<li className='hp-card-li'>
									Matthew's Foodtruck
									Alices Foodtruck
									John's Foodtruck
								</li>
								</ul>
							</div>
						<div className='hp-card2'>Tuesday</div>
						<div className='hp-card3'>Wednesday</div>
						<div className='hp-card4'>Thursday</div>
						<div className='hp-card5'>Friday</div>
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


