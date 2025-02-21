//Lauren
import { useEffect, useState } from 'react';
import {retrieveOwnerFoodtruck, createOwnerFoodtruck} from '../api/foodtruckAPI';
import DatePicker from "react-datepicker";
import FoodtruckData from '../interfaces/FoodtruckData';


const newFoodtruck = () => {

    const [newFoodtruck, setNewFoodtruck] = useState<FoodtruckData>( {id: null, foodtruckName: '', 
        cuisine: '',
        menuImg: '',
        description: '',
        zipCode: null,
        startDate: new Date(),
        endDate: new Date(),
        }
    )

const createNewFoodtruck = async (body: FoodtruckData) => {
    try {
        const foodtruckdata = await createOwnerFoodtruck(body);
        return foodtruckdata;
    } catch (err) {
        console.error('Failed to create new foodtruck', err);
    }
};

// useEffect(() => {
//     const initialize = async ()
// }) 
const setNewFoodtruck = async (event: FormEvent) => {
    event.preventDefault();
    if (newFoodtruck) {
        const data = createNewFoodtruck(newFoodtruck);
        console.log(data);

    }
}

    return (
        <div className="newFoodtruck">
            <form>
                <h1>Add New Foodtruck</h1>

                <label>Foodtruck Name: </label>
                <input type="text" name="foodtruckName" value={newFoodtruck?.foodtruckName || ''}  onChange={handleChange} />


            </form>
        </div>
    )
}







const FoodtruckOwner = () => {
    const [foodtruck, setFoodtruck] = useState<any>(undefined);

    const fetchFoodtrucks = 

}