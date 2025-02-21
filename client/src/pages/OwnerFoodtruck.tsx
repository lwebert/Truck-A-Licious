// import { useState } from 'react';
// import { FormEvent, useState } from 'react';
// import {
// 	retrieveOwnerFoodtruck,
// 	createOwnerFoodtruck,
// } from '../api/foodtruckAPI';
// import DatePicker from 'react-datepicker';
// import FoodtruckData from '../interfaces/FoodtruckData';

const NewFoodtruck = () => {
	// const [newFoodtruck, setNewFoodtruck] = useState<FoodtruckData | undefined>({
	// 	id: null,
	// 	foodtruckName: '',
	// 	cuisine: '',
	// 	menuImg: '',
	// 	description: '',
	// 	zipCode: null,
	// 	startDate: new Date(),
	// 	endDate: new Date(),
	// });

	// const createNewFoodtruck = async (body: FoodtruckData) => {
	// 	try {
	// 		const foodtruckdata = await createOwnerFoodtruck(body);
	// 		return foodtruckdata;
	// 	} catch (err) {
	// 		console.error('Failed to create new foodtruck', err);
	// 	}
	// };

	// const handleSubmit = async (event: FormEvent) => {
	// 	event.preventDefault();
	// 	if (newFoodtruck) {
	// 		const data = createNewFoodtruck(newFoodtruck);
	// 		console.log(data);
	// 	}
	// };

	return (
		<div>
			{/* <form onSubmit={handleSubmit}>
				<h1>Add New Foodtruck</h1>

				<label>Foodtruck Name: </label>
				<input type="text" name="foodtruckName" value={newFoodtruck?.foodtruckName || ''}  onChange={handleChange} />
			</form> */}
		</div>
	);
};

export default NewFoodtruck;
