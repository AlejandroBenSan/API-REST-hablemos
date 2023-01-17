import {Router} from 'express'
import { createProfesor,getProfesorByEmailPassword,getProfesorEmail,updateProfesor } from '../controllers/profesores.controller.js';

const router = Router();

//CREAR UN PROFESOR
router.post('/profesores',createProfesor)

//BUSCANDO ESTUDIANTE POR EMAIL Y CONTRASEÑA (LOGIN)
router.get('/profesores/login/:email/:contrasenya',getProfesorByEmailPassword)

//OBTENIENDO LA INFORMACIÓN DEL ESTUDIANTE CON EL EMAIL DESPUES DE LOGIN O LA CREACIÓN DE CUENTA
router.get('/profesores/access/:email',getProfesorEmail)

//ACTUALIZANDO UN PROFESOR
router.patch('/profesores/update/:id',updateProfesor)

export default router