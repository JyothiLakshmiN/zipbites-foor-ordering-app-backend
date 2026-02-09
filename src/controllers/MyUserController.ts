import { Request, Response } from "express";
import User from "../models/user";

const createCurrentUser = async (req: Request, res: Response) => {
    // 1. check if user exist.
    // 2. create user if it doesn't exist.
    // 3. return object to frontend
    try {
        const { auth0Id } = req.body;
    
        const existingUser = await User.findOne({ auth0Id: auth0Id });
        if(existingUser) {
            return res.status(200).json(existingUser.toObject());
        }

        const newUser = new User(req.body);
        await newUser.save();
        res.status(201).json(newUser.toObject());

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }


};

const updateCurrentUser = async (req: Request, res: Response) => {

    try {
        const {name, addressLine1, city, country} = req.body;
        const user = await User.findById(req.userId);

        if(!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        user.name = name || user.name;
        user.addressLine1 = addressLine1 || user.addressLine1;
        user.city = city || user.city;
        user.country = country || user.country;
        await user.save();
        res.send(user.toObject());

    } catch (error) {
        res.status(500).json({ message: 'Internal Server Error'});
    }
};

const getCurrentUser = async (req: Request, res: Response) => {

    try {
        const currentUser = await User.findOne({ id: req.userId });
        if(!currentUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(currentUser);

    } catch (error) {
        res.status(500).json({ message: 'Something went wrong' });
    }
}
export default {
    getCurrentUser,
    createCurrentUser,
    updateCurrentUser,
};
