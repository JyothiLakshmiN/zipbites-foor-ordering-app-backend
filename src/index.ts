import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';      
import myUserRoutes from "./routes/myUserRoutes";
import MyRestaurantRoutes from './routes/MyRestaurantRoutes';
import restaurantRoute from './routes/RestaurantRoute';
import orderRoute from './routes/OrderRoute';

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log('Connected to MongoDB');
});

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
});

const app = express(); // Creates the application instance
app.use(cors()); // Middleware to enable cors
app.use('/api/order/checkout/webhook', express.raw({ type: "*/*"}));
app.use(express.json()); // Middleware to parse JSON request bodies


app.get("/health", async (req: Request, res: Response) => {
    res.send("Health check OK");
});

app.use('/api/my/user', myUserRoutes);
app.use('/api/my/restaurant', MyRestaurantRoutes); // Importing the restaurant routes
app.use('/api/restaurant', restaurantRoute);
app.use('/api/order', orderRoute);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
