import {poll} from '../db.js'

//CREAR PROFESOR
export const createProfesor = async (req,res) => {
    try{
        
        const {nombre,apellidos,email,contrasenya,edad,info,foto} = req.body
        
        if(foto == undefined){
            
            const [rows] = await poll.query('INSERT INTO profesores (nombre,apellidos,email,contrasenya,edad,info,foto) Values (?,?,?,?,?,?,?);',
            [nombre,apellidos,email,contrasenya,edad,info,foto]);

            res.send(rows)
            
        }else{
            const [rows] = await poll.query('INSERT INTO profesores (nombre,apellidos,email,contrasenya,edad,info,foto) Values (?,?,?,?,?,?,UNHEX(?))',
            [nombre,apellidos,email,contrasenya,edad,info,foto])

            res.send(rows)
        }

    }catch (ApiError){
        return res.status(500).json({
            ApiError
        }
        )
    }
}

//OBTENER UN PROFESOR POR EMAIL (ACCESO CON LOGIN)
export const getProfesorByEmailPassword = async (req,res) => {
    try{
    const email = req.query.email
    const contrasenya = req.query.contrasenya

    const [rows] = await poll.query('SELECT email,contrasenya FROM profesores WHERE (email = ?) AND (contrasenya = ?)',[email,contrasenya])
    if(rows.length <= 0){
        return res.status(404).json({
            message: 'Email o contraseña incorrecta'
        })
    }else{
        res.status(204).json({
            message: 'Encontrado'
        })
    }
    }catch(Error){
        res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
}   