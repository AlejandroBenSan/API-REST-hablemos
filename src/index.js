import express from 'express'
import estudiantesRoutes from './routes/estudiantes.routes.js'
import indexRoutes from './routes/index.routes.js'
import {PORT} from './config.js'

const app = express()

//ESTE METODO SIRVE PARA PODER INTERPRETAR ARCHIVOS JSON ANTES DE QUE LLEGUE A LAS RUTAS
app.use(express.json())

app.use(indexRoutes);
app.use('/api',estudiantesRoutes);

//Con esta funcion controlaremos los errores cuando no encuetre una ruta
app.use((req,res,next) => {
    res.status(404).json({
        message: 'No se ha encontrado la ruta especificada'
    })
})

app.listen(PORT)
console.log("Server is running on port "+PORT)