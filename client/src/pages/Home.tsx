//Lauren
import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
// import UserList from '../components/Users';
import auth from '../utils/auth';

// import OwnerFoodtruck from './OwnerFoodtruck';
import FoodtruckForm from '../components/FoodtruckForm';

const Home = () => {
	const [users, setUsers] = useState<UserData[]>([]);
	const [error, setError] = useState(false);
	const [loginCheck, setLoginCheck] = useState(false);

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
			{!loginCheck ? (
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
			) : (
				// TODO: Create state and imports
				// foodtruckCheck ? (<FoodtruckDisplay />) : (<FoodtruckForm />)
				// <div></div>
				<FoodtruckForm />
			)}
		</>
	);
};

export default Home;
