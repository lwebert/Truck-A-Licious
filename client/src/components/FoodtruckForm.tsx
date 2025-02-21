import { useState, FormEvent } from 'react';
import FoodtruckData from '../interfaces/FoodtruckData';
import { createOwnerFoodtruck } from '../api/foodtruckAPI';



const FoodtruckForm: React.FC<FoodtruckData> = () => {
	const [newFoodtruck, setNewFoodtruck] = useState<FoodtruckData>({
		id: null,
		foodtruckName: null,
		cuisine: null,
		menuImg: null,
		description: null,
		zipCode: null,
		startDate: new Date(),
		endDate: new Date(),
	});

	const createNewFoodtruck = async (body: FoodtruckData) => {
		try {
			const foodtruckdata = await createOwnerFoodtruck(body);
			return foodtruckdata;
		} catch (err) {
			console.error('Failed to create new foodtruck', err);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		setNewFoodtruck((prevState) => ({
			...prevState,
			[name]: name.includes('Date') ? new Date(value) : value || null,
		}));
	};

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const file = event.target.files?.[0];
		if (file) {
			setNewFoodtruck((prevState) => ({
				...prevState,
				menuImg: file.name,
			}));
		}
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		if (
			newFoodtruck.foodtruckName &&
			newFoodtruck.cuisine &&
			newFoodtruck.menuImg &&
			newFoodtruck.description &&
			newFoodtruck.zipCode !== null
		) {
			const data = createNewFoodtruck(newFoodtruck);
			console.log(data);
		}
	};

	return (
		<div>
			<h1>Add New Foodtruck</h1>
			<form onSubmit={handleSubmit}>
				<label>Foodtruck Name: </label>
				<input
					value={newFoodtruck?.foodtruckName || ''}
					onChange={handleChange}
				/>

				<label>Foodtruck Description: </label>
				<input
					value={newFoodtruck?.description || ''}
					onChange={handleChange}
				/>

				<label>Cuisine: </label>
				<input
					list="cuisines"
					value={newFoodtruck?.cuisine || ''}
					onChange={handleChange}
				/>
				<datalist id="cuisines">
					<option value="italian">Italian</option>
					<option value="japanese">Japanese</option>
					<option value="thai">Thai</option>
					<option value="mexican">Mexican</option>
					<option value="american">American</option>
					<option value="greek">Greek</option>
					<option value="fusion">Fusion</option>
				</datalist>

				<label>Select an image of your menu: </label>
				<input type="file" id="menufile" onChange={handleFileChange} />

				<label>Zip Code: </label>
				<input
					type="number"
					value={
						newFoodtruck?.zipCode !== null
							? newFoodtruck.zipCode
							: ''
					}
					onChange={handleChange}
				/>

				<label>Start Date: </label>
				<input
					name="startDate"
					type="date"
					value={
						newFoodtruck.startDate
							? newFoodtruck.startDate.toISOString().split('T')[0]
							: ''
					}
					onChange={handleChange}
				/>

				<label>End Date: </label>
				<input
					name="endDate"
					type="date"
					value={
						newFoodtruck.endDate
							? newFoodtruck.endDate.toISOString().split('T')[0]
							: ''
					}
					onChange={handleChange}
				/>

				<button type="submit">Create Foodtruck</button>
			</form>
		</div>
	);
};

export default FoodtruckForm;

{
	/* <DatePicker
	selected={startDate}
	onChange={(date) => setStartDate(date)}
	dateFormat="yyyy-MM-dd"
	startDate={startDate}
	endDate={endDate}
	name="startDate"
/>; */
}
