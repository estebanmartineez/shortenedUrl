import express, {Request, Response, NextFunction} from 'express';
import urlRoutes from './routes/url.routes';
//import dotenv from 'dotenv';
import cors from 'cors';
import mongoose from "mongoose";
//dotenv.config();

const app = express();

//connection mongoose
mongoose.connect('mongodb://localhost:27017/url_shortened').then(() => {
    console.log('Database connected');
})

app.use(cors());
app.use(express.json());

// Routes
app.use('/urls', urlRoutes);

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error('Error:', err.stack);
    res.status(500).json({message: 'Internal Server Error'});
});

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});


console.log('process.env.PORT', process.env.PORT);
const PORT: number = parseInt(process.env.PORT as string, 10) || 3000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

export default app;
