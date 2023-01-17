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

//CARGAR LA INFORMACIÓN DEL PROFESOR DESPUES DEL LOGIN O LA CREACIÓN DE UNA CUENTA
export const getProfesorEmail = async (req,res) => {
    try{
        const email = req.params.email

        const [rows] = await poll.query('SELECT id,nombre,apellidos,email,contrasenya,edad,info,HEX(foto) AS foto FROM profesores WHERE email = ?',[email])

        //MODIFICAMOS LA SALIDA DE LA EDAD PARA QUE SALGA CON ESTE FORMATO dd/MM/yyyy
        const date = new Date(rows[0].edad)
        const outputDate = date.toLocaleDateString('es-Es',{
            year: 'numeric',
            month: '2-digit',
            day: '2-digit'
        })
        rows[0].edad = outputDate

        res.json(rows[0])

    }catch(error){
        res.status(500).json({
            error
        })
    }
}

//ACTUALIZAR UN PROFESOR
export const updateProfesor = async (req,res) => {
    try{
        const id = req.params.id
        const {nombre,apellidos,email,contrasenya,edad,info,foto} = req.body
    
        const [result] = await poll.query('UPDATE profesores SET nombre = IFNULL(?,nombre), apellidos = IFNULL(?,apellidos), email = IFNULL(?,email),'+ 
            'contrasenya = IFNULL(?,contrasenya), edad = IFNULL(?,edad), info = IFNULL(?,info)'+
            ', foto = IFNULL(UNHEX(?),foto) WHERE id = ?',[nombre,apellidos,email,contrasenya,edad,info,foto,id])
    
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Estudiante no encontrado. Error al actualizar'
            })
        }else{
            return res.sendStatus(204)
        }
    }catch(error){
        return res.status(500).json({
            message: "Error"
        })
    }
} 