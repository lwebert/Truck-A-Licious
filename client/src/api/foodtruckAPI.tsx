//Lauren

import FoodtruckData from '../interfaces/FoodtruckData';

//fetch to api/foodtrucks (GET) - for home page calendar
const retrieveAllFoodtrucks = async () => { };

//fetch to api/foodtrucks/:zipCode (GET)- for home page calendar
const retrieveFoodtrucksbyZip = async () => { };


//fetch to api/foodtrucks/:id (GET) - for foodtruckOwner page
const retrieveOwnerFoodtruck = async (
	userId: number | null
): Promise<FoodtruckData> => {
	try {
		const response = await fetch(`api/foodtrucks/${userId}`, {
			headers: {
				'Content-Type': 'application/json',
			},
		});
		const data = await response.json();
		if (!response.ok) {
			throw new Error(
				'invalid foodtruck API response, check network tab!'
			);
		}
		return data;
	} catch (err) {
		console.log('Error from data retrieval:', err);
		return Promise.reject("Could not fetch owner's foodtruck");
	}
};

//fetch to api/foodtrucks (POST) - for foodtruckOwner page
// const createOwnerFoodtruck = async (
// 	body: FoodtruckData
// ): Promise<FoodtruckData> => {
// 	try {
// 		const response = await fetch('/api/foodtrucks/', {
// 			method: 'POST',
// 			headers: {
// 				'Content-Type': 'application/json',
// 			},
// 			body: JSON.stringify(body),
// 		});

// 		const data = await response.json();
// 		if (!response.ok) {
// 			throw new Error('invalid API response, check network tab!');
// 		}
// 		return data;
// 	} catch (err) {
// 		console.log('Error from foodtruck creation: ', err);
// 		return Promise.reject('Could not create new foodtruck');
// 	}
// };

const createOwnerFoodtruck = async (
	body: FoodtruckData
): Promise<FoodtruckData> => {
	console.log("API body: ", body)
	try {
		const response = await fetch('/api/foodtrucks/', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(body),
		});

		// Check for API await response errors before parsing JSON
		if (!response.ok) {
			throw new Error(`Invalid API response: ${response.status} ${response.statusText}`);
		}

		const data = await response.json();
		return data;
	} catch (err) {
		console.error('Error from foodtruck creation:', err);
		return Promise.reject(err);
	}
};

export {
	retrieveAllFoodtrucks,
	retrieveFoodtrucksbyZip,
	retrieveOwnerFoodtruck,
	createOwnerFoodtruck,
};
