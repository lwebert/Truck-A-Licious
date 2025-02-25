import { useState, useEffect, useLayoutEffect } from 'react';
import { retrieveUsers } from '../api/userAPI';
import type { UserData } from '../interfaces/UserData';
import ErrorPage from './ErrorPage';
import auth from '../utils/auth';
import FoodtruckForm from '../components/FoodtruckForm';
import FoodtruckDisplay from '../components/FoodtruckDisplay';
import { retrieveOwnerFoodtruck } from '../api/foodtruckAPI';
import FoodtruckData from '../interfaces/FoodtruckData';


const FoodTruckDetail = () => {
    return (
        <div>
            <main>
                
            </main>
        </div>
    );
};


export default FoodTruckDetail;

