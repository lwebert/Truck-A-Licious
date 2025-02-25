//Lauren
import { useState, FormEvent } from 'react';
import FoodtruckData from '../interfaces/FoodtruckData';
import { createOwnerFoodtruck } from '../api/foodtruckAPI';

interface FoodtruckFormProps {
	foodtruckSubmit: () => void;
	userId: number | null;
}

const FoodtruckForm: React.FC<FoodtruckFormProps> = ({
	foodtruckSubmit,
	userId,
}) => {
	const [newFoodtruck, setNewFoodtruck] = useState<FoodtruckData>({
		id: null,
		foodtruckName: null,
		cuisine: null,
		menuImg: null,
		description: null,
		zipCode: null,
		startDate: new Date(),
		endDate: new Date(),
		UserId: userId,
	});

	const createNewFoodtruck = async (body: FoodtruckData) => {
		const foodtruckData = { ...body, UserId: userId };
		console.log('Foodtruck form, body and userId: ', foodtruckData);
		try {
			const foodtruckdata = await createOwnerFoodtruck(foodtruckData);
			console.log(
				'Foodtruck form, foodtruck data after createOwnerFoodtruck(): ',
				foodtruckdata
			);
			return foodtruckdata;
		} catch (err) {
			console.error('Failed to create new foodtruck', err);
		}
	};

	const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = event.target;
		const newFoodtruckClone: FoodtruckData = { ...newFoodtruck };

		const keys = Object.keys(newFoodtruckClone);
		if (!keys.includes(name)) {
			console.log('Invalid name: ', name);
			return;
		}

		if (name === 'zipCode') {
			console.log(value);
			if (isNaN(value as any)) {
				console.log('Invalid number input: ', value);
				return;
			}
			(newFoodtruckClone as any)[name] = parseInt(value);
		} else {
			(newFoodtruckClone as any)[name] = value;
		}
		setNewFoodtruck(newFoodtruckClone);
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

	const handleDateChange = (
		event: React.ChangeEvent<HTMLInputElement>,
		key: string
	) => {
		const { name, value } = event.target;
		const newFoodtruckClone: FoodtruckData = { ...newFoodtruck };

		if (name !== key) {
			console.log('Input mismatch. Expected: ', key, 'Received :', name);
		}

		(newFoodtruckClone as any)[key] = new Date(value);

		setNewFoodtruck(newFoodtruckClone);
	};

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();
		console.log(newFoodtruck);
		if (
			// newFoodtruck.foodtruckName &&
			// newFoodtruck.cuisine &&
			// newFoodtruck.menuImg &&
			// newFoodtruck.description &&
			// newFoodtruck.zipCode !== null
			newFoodtruck
		) {
			const data = await createNewFoodtruck(newFoodtruck);
			foodtruckSubmit();
			console.log('Foodtruck created: ', data);
		} else {
			console.log("New food truck doesn't have all fields.");
		}
	};

	return (
		<div>
			<h1>Add New Foodtruck</h1>
			<ul id='formsubmit'>
				<form onSubmit={handleSubmit}>
					<li>
						<label>Foodtruck Name:</label>
						<input
							value={newFoodtruck?.foodtruckName || ''}
							onChange={(event) => {
								handleChange(event);
							}}
							type="text"
							name="foodtruckName"
						/>
					</li>

					<li>
						<label>Foodtruck Description: </label>
						<input
							value={newFoodtruck?.description || ''}
							onChange={handleChange}
							type="text"
							name="description"
						/>
					</li>

					<li>
						<label>Cuisine: </label>
						<input
							list="cuisines"
							value={newFoodtruck?.cuisine || ''}
							onChange={handleChange}
							name="cuisine"
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
					</li>

					<li>
						<label>Select an image of your menu: </label>
						<input
							type="file"
							id="menufile"
							onChange={handleFileChange}
							name="menuImg"
						/>
					</li>

					<li>
						<label>Zip Code: </label>
						<input
							type="text"
							value={
								newFoodtruck?.zipCode !== null
									? newFoodtruck.zipCode
									: ''
							}
							onChange={handleChange}
							name="zipCode"
						/>
					</li>

					<li>
						<label>Start Date: </label>
						<input
							name="startDate"
							type="date"
							value={
								newFoodtruck.startDate
									? newFoodtruck.startDate.toISOString().split('T')[0]
									: ''
							}
							onChange={(event) => {
								handleDateChange(event, 'startDate');
							}}
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
							onChange={(event) => {
								handleDateChange(event, 'endDate');
							}}
						/>
					</li>

					<button type="submit">Create Foodtruck</button>
				</form>
			</ul>
		</div>
	);
};

export default FoodtruckForm;
