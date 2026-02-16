import { Request,  Response} from "express"
import Restaurant from "../models/restaurant";
import { v2 as cloudinary } from 'cloudinary';
import mongoose from "mongoose";

const getMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId!});
        if(!restaurant) {
            return res.status(404).json({message: "restaurant not found"});
        }
        res.json(restaurant);
    } catch(error) {
        console.log("error", error);
        res.status(500).json({message: "Error fetching restaurant"})
    }
};

const createMyRestaurant = async (req: Request, res: Response) => {

    try {
        const existingRestaurant = await Restaurant.findOne({ user: req.userId! });
        if (existingRestaurant) {
            return res.status(409).json({message: "You already have a restaurant. Please update it instead."});
        }
        const { restaurantName, city, country, deliveryPrice, estimatedDeliveryTime, cuisines, menuItems } = req.body;

        // const image = req.file as Express.Multer.File;
        // const base64Image = Buffer.from(image.buffer).toString('base64');
        // const dataURI = `data:${image.mimetype};base64,${base64Image}`;
        // const uploadResult = await cloudinary.uploader.upload(dataURI);


        const imageFile = await uploadImage(req.file as Express.Multer.File);

        const newRestaurant = new Restaurant({
            user: req.userId,
            restaurantName,
            city,
            country,
            deliveryPrice,
            estimatedDeliveryTime,
            cuisines,
            menuItems,
            imageFile,
        });

        newRestaurant.user = new mongoose.Types.ObjectId(req.userId!);
        await newRestaurant.save();
        res.status(201).json(newRestaurant);

    } catch(error) {
        console.error("Error creating restaurant:", error);
        res.status(500).json({message: "Something went wrong while creating the restaurant"});
    }

}

const updateMyRestaurant = async (req: Request, res: Response) => {
    try {
        const restaurant = await Restaurant.findOne({user: req.userId!});

        if(!restaurant) {
            return res.status(404).json({message: "restaurant not found"});
        }
        restaurant.restaurantName = req.body.restaurantName;
        restaurant.city = req.body.city;
        restaurant.country = req.body.country;
        restaurant.deliveryPrice = req.body.deliveryPrice;
        restaurant.estimatedDeliveryTime = req.body.estimatedDeliveryTime;
        restaurant.cuisines = req.body.cuisines;
        restaurant.menuItems = req.body.menuItems;
        restaurant.lastUpdated = new Date();

        if(req.file) {
            const imageFile = await uploadImage(req.file as Express.Multer.File);
            restaurant.imageFile = imageFile;
        }

        await restaurant.save();
        res.status(200).send(restaurant);
        
    } catch(error) {
        console.log('error', error);
        res.status(500).json({message: "Error in updatign the restaurant"})
    }
};


const uploadImage = async (file: Express.Multer.File) => {
    const image = file;
    const base64Image = Buffer.from(image.buffer).toString('base64');
    const dataURI = `data:${image.mimetype};base64,${base64Image}`;
    const uploadResult = await cloudinary.uploader.upload(dataURI);
    return uploadResult.url;
}

export default {
    createMyRestaurant,
    updateMyRestaurant,
    getMyRestaurant,
}