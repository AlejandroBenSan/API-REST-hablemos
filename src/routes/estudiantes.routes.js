import {Router} from 'express'
import {getEstudiantes,createEstudiante,updateEstudiante,deleteEstudiante,getEstudianteByID,getEstudianteByEmailPassword} from'../controllers/estudiantes.controller.js'
import {getEstudianteEmail} from'../controllers/estudiantes.controller.js'

const router = Router();

//OBTENIENDO DATOS
router.get('/estudiantes',getEstudiantes)

//buscando estudiante con id (pasamos un parametro)
router.get('/estudiantes/:id',getEstudianteByID)

//BUSCANDO ESTUDIANTE POR EMAIL Y CONTRASEÑA (LOGIN)
router.get('/estudiantes/login/:email/:contrasenya',getEstudianteByEmailPassword)

//OBTENIENDO LA INFORMACIÓN DEL ESTUDIANTE CON EL EMAIL DESPUES DE LOGIN O LA CREACIÓN DE CUENTA
router.get('/estudiantes/access/:email',getEstudianteEmail)

//CREANDO DATOS
router.post('/estudiantes',createEstudiante)

//ACTUALIZAMOS LOS DATOS
//si queremos camniar todos los datos mediante json utilizaremos PUT
//pero si solo queremos cambiar algunos mediante json utilizaremos PATCH
//en la función deberemos establecerla de la siguiente manera:
//'UPDATE estudiantes SET nombre = IFNULL(?,nombre) si es nulo o undefinied dejara el valor que ya estaba
router.patch('/estudiantes/update/:id',updateEstudiante)

//BORRAMOS LOS DATOS
//pasamos un parametro
router.delete('/estudiantes/:id',deleteEstudiante)


export default router;