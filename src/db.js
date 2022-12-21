import { createPool } from "mysql2/promise";
import {DB_HOST,DB_PORT,DB_USER,DB_PASSWORD,DB_DATABASE} from './config.js'

//CREAMOS LA CONEXIÓN CON LA BASE DE DATOS
//TODO habra que cambiar el host cuando tengamos la base de datos en la nube
export const poll = createPool({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    port: DB_PORT,
    database: DB_DATABASE
})