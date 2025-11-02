import { AppDataSource } from "../db/date-source";
import { Vibration } from "../entities/Vibration";

export const VibrationRepository = AppDataSource.getRepository(Vibration);