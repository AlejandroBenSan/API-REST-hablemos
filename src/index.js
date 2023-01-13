import express from 'express'
import estudiantesRoutes from './routes/estudiantes.routes.js'
import profesoresRoutes from './routes/profesores.routes.js'
import indexRoutes from './routes/index.routes.js'
import {PORT} from './config.js'
import bodyParser from 'body-parser'

const app = express()

//ESTE METODO SIRVE PARA PODER INTERPRETAR ARCHIVOS JSON ANTES DE QUE LLEGUE A LAS RUTAS
//EL BODY PARSES SIRVE EN ESTE CASO PARA QUE EL JSON TENGA MAS CAPACIDAD
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(express.json());

app.use(indexRoutes);
app.use('/api',estudiantesRoutes);
app.use('/api',profesoresRoutes);

//Con esta funcion controlaremos los errores cuando no encuetre una ruta
app.use((req,res,next) => {
    res.status(404).json({
        message: 'No se ha encontrado la ruta especificada'
    })
})

app.listen(PORT)
console.log("Server is running on port "+PORT)
