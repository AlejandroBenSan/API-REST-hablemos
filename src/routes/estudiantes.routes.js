import {Router} from 'express'
import {getEstudiantes,createEstudiante,updateEstudiante,deleteEstudiante,getEstudianteByID} from'../controllers/estudiantes.controller.js'

const router = Router();

//OBTENIENDO DATOS
router.get('/estudiantes',getEstudiantes)
//buscando estudiante con id (pasamos un parametro)
router.get('/estudiantes/:id',getEstudianteByID)

//CREANDO DATOS
router.post('/estudiantes',createEstudiante)

//ACTUALIZAMOS LOS DATOS
//si queremos camniar todos los datos mediante json utilizaremos PUT
//pero si solo queremos cambiar algunos mediante json utilizaremos PATCH
//en la función deberemos establecerla de la siguiente manera:
//'UPDATE estudiantes SET nombre = IFNULL(?,nombre) si es nulo o undefinied dejara el valor que ya estaba
router.put('/estudiantes/:id',updateEstudiante)

//BORRAMOS LOS DATOS
//pasamos un parametro
router.delete('/estudiantes/:id',deleteEstudiante)

export default router;