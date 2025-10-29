import express          from "express";
import cors             from "cors";
import dotenv           from 'dotenv';
import {AppDataSource}  from "./db/date-source";
import { router as  authRoutes } from './routes/authRoute';
import { router as  userRoutes } from './routes/userRoute';
import { router as  roleRoutes } from './routes/roleRoute';

dotenv.config();

const PORT = process.env.SERVER_PORT || 4000;
const app = express();

app.use(express.json());
app.use(cors());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/role", roleRoutes);


AppDataSource.initialize()
.then(() => {
    console.log("Database success initalize");
})
.catch((error) => {
    console.log(`Error iniatialize Database: ${error}`);
})

app.listen(PORT, () => {
    console.log(`Server is running in http://localhost:${PORT}`);
})