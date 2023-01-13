import {Router} from 'express'
import { createProfesor,getProfesorByEmailPassword } from '../controllers/profesores.controller.js';

const router = Router();

//CREAR UN PROFESOR
router.post('/profesores',createProfesor)

//BUSCANDO ESTUDIANTE POR EMAIL Y CONTRASEÑA (LOGIN)
router.get('/profesores/login/:email/:contrasenya',getProfesorByEmailPassword)

export default router