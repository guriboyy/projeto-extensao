import "reflect-metadata";
import {config}               from "dotenv";
import { DataSource }         from "typeorm";
import { EventBoard }         from "../entities/EventBoard";
import { Meeting }            from "../entities/Meeting";
import { MeetingCategory }    from "../entities/MeetingCategory";
import { NoticeBoard }        from "../entities/NoticeBoard";
import { RefreshToken }       from "../entities/RefreshToken";
import { Role }               from "../entities/Role";
import { RoleScreen }         from "../entities/RoleScreen";
import { RoleScreenFunction } from "../entities/RoleScreenFunction";
import { Screen }             from "../entities/Screen";
import { ScreenFunction }     from "../entities/ScreenFunction";
import { UserAccount }        from "../entities/UserAccount";

config();

export const AppDataSource = new DataSource({
    type: "mysql",
    host: process.env.DATABASE_HOST ?? "localhost",
    port: process.env.DATABASE_PORT ? parseInt(process.env.DATABASE_PORT) : 3306,
    username: process.env.DATABASE_USERNAME ?? "root",
    password: process.env.DATABASE_PASSWORD ?? "localhost",
    database: process.env.DATABASE_DBNAME ?? "portalfraternidade",
    synchronize: false,
    logging: false,
    charset: "utf8mb4_unicode_ci",
    entities: [
        EventBoard,
        Meeting,
        MeetingCategory,
        NoticeBoard,
        RefreshToken,
        Role,
        RoleScreen,
        RoleScreenFunction,
        Screen,
        ScreenFunction,
        UserAccount
    ],
    subscribers: [],
    migrations: [],
})