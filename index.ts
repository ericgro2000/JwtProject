import express, { Express } from 'express';
import mongoose from 'mongoose';

const app: Express = express();

app.use(express.json());

const PORT = process.env.PORT || 3000;

const start = async (): Promise<void> => {
    try {
        await mongoose.connect(`mongodb+srv://qwerty:qwerty123@cluster0.b6pb9.mongodb.net/auth_roles?retryWrites=true&w=majority`);
        app.listen(PORT, () => console.log(`server started on port ${PORT}`));
    } catch (e) {
        console.log(e);
    }
};

start();