import "reflect-metadata";
import {config}               from "dotenv";
import { DataSource }         from "typeorm";
import { EventBoard }         from "../entities/EventBoard";
import { Meeting }            from "../entities/Meeting";
import { NoticeBoard }        from "../entities/NoticeBoard";
import { RefreshToken }       from "../entities/RefreshToken";
import { Role }               from "../entities/Role";
import { RoleScreen }         from "../entities/RoleScreen";
import { RoleScreenFunction } from "../entities/RoleScreenFunction";
import { Screen }             from "../entities/Screen";
import { ScreenFunction }     from "../entities/ScreenFunction";
import { UserAccount }        from "../entities/UserAccount";
import { Vibration }          from "../entities/Vibration";
import { PasswordResetCode }  from "../entities/PasswordResetCode";
import mysql2 from "mysql2/promise"; 

config();

const dbName = process.env.DATABASE_DBNAME ?? "portalfraternidade";
const dbHost = process.env.DATABASE_HOST ?? "localhost";
const dbPort = process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306;
const dbUser = process.env.DATABASE_USERNAME ?? "root";
const dbPass = process.env.DATABASE_PASSWORD ?? "";

export const AppDataSource = new DataSource({
    type: "mysql",
    host: dbHost,
    port: dbPort,
    username: dbUser,
    password: dbPass,
    database: dbName,
    synchronize: true,
    logging: true,
    charset: "utf8mb4_unicode_ci",
    entities: [
        EventBoard,
        Meeting,
        NoticeBoard,
        RefreshToken,
        Role,
        RoleScreen,
        RoleScreenFunction,
        Screen,
        ScreenFunction,
        UserAccount,
        Vibration,
        PasswordResetCode
    ],
    subscribers: [],
    migrations: [],
});

export async function initializeDatabase() {
    const connection = await mysql2.createConnection({
        host: dbHost,
        port: dbPort,
        user: dbUser,
        password: dbPass,
    });

    await connection.query(`
        CREATE DATABASE IF NOT EXISTS \`${dbName}\`
        DEFAULT CHARACTER SET utf8mb4
        DEFAULT COLLATE utf8mb4_general_ci;
    `);

    AppDataSource.initialize()
    .then(async () => {
        console.log("Database success initalize");
        
        await connection.query(
            `use ${dbName};`
        );
        await connection.query(
            `INSERT INTO Role(Name) VALUES ('Admin'), ('Obreiro'), ('Membro');`
        );
    })
    .catch((error) => {
        console.log(`Error iniatialize Database: ${error}`);
    })
    .finally(async ()=> {
        await connection.end();
    })
}
