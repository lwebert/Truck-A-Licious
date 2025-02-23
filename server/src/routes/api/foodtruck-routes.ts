//Lauren
import express from 'express';
import type { Request, Response } from 'express';
import { User, Foodtruck } from '../../models/index.js';

const router = express.Router();

//GET all foodtrucks
router.get('/', async (_req: Request, res: Response) => {
	try {
		const foodtruckData = await Foodtruck.findAll({
			include: [{ model: User }],
		});
		res.status(200).json(foodtruckData);
	} catch (err) {
		res.status(500).json(err);
	}
});

//GET foodtrucks by zip code
router.get('/:zipCode', async (req: Request, res: Response) => {
	try {
		const searchZipCode = req.params.zipCode;
		const foodtruckData = await Foodtruck.findAll({
			where: { zipCode: searchZipCode },
			include: [{ model: User }],
		});

		if (!foodtruckData) {
			res.status(404).json({
				message: 'No food trucks found with that zip code!',
			});
			return;
		}

		res.status(200).json(foodtruckData);
	} catch (err) {
		res.status(500).json(err);
	}
});


//GET foodtruck for logged in User
// router.get('/:userId', async (req: Request, res: Response) => {
//     const userId = req.user?.username;
//     try {
//         const foodTruck = await Foodtruck.findOne(
//             {where: {userId: userId}}
//         )
//         if (!foodTruck) {
//             res.status(404).json({message: 'No food truck found for user.'})
//         }
//         return res.json(foodTruck)
//     }
//     catch (err) {
//         res.status(500).json(err)
//     }
// })


//TODO: POST request to create a foodtruck




export { router as foodtruckRouter };
