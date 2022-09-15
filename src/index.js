import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoute.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use(authRoutes);

app.get('status', (req, res) => {
    return res.send('Ok')
})

app.listen(5000, () => {
    console.log(`Magic happens on ${process.env.MONGODB_URL}`);
});