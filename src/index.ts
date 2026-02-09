import express, { Request, Response } from 'express';
import cors from 'cors';
import "dotenv/config";
import mongoose from 'mongoose';
import myUserRoutes from "./routes/myUserRoutes";

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
    console.log('Connected to MongoDB');
});

const app = express(); // Creates the application instance
app.use(express.json()); // Middleware to parse JSON request bodies
app.use(cors()); // Middleware to enable cors

app.get("/health", async (req: Request, res: Response) => {
    res.send("Health check OK");
});

app.use('/api/my/user', myUserRoutes);

app.listen(8000, () => {
    console.log('Server is running on port 8000');
});
