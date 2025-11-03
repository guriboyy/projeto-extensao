import { AppDataSource } from "../db/data-source";
import { Vibration } from "../entities/Vibration";

export const VibrationRepository = AppDataSource.getRepository(Vibration);