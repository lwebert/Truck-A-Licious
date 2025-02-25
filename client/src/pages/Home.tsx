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
					<FoodtruckForm />
				)
			}
		</>
	);
};

export default Home;


