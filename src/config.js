import {config} from 'dotenv'

//De esta manera podemos leer variables de entorno almacenadas en .env
config()
//si no existe || le asignamos el valor que pongamos
export const PORT =process.env.PORT || 3000
export const DB_HOST = process.env.DB_HOST || "localHost"
export const DB_PORT = process.env.DB_PORT || 3006
export const DB_USER = process.env.DB_USER || root
export const DB_PASSWORD = process.env.DB_PASSWORD || ""
export const DB_DATABASE = process.env.DB_DATABASE || "hablemos"