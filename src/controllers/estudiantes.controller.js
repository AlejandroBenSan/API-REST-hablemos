import {poll} from '../db.js'

export const getEstudiantes = async (req,res) => {
    try {
        const [rows] = await poll.query('SELECT * FROM estudiantes')
        
        res.json(rows)
    } catch (error) {
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
    
}

//CARGAR LA INFORMACIÓN DEL ESTUDIANTE DESPUES DEL LOGIN O LA CREACIÓN DE UNA CUENTA
export const getEstudianteEmail = async (req,res) => {
    try{
        const email = req.params.email

        const [rows] = await poll.query('SELECT * FROM estudiantes WHERE email = ?',[email])
        console.log(rows[0])
        res.json(rows[0])

    }catch(error){
        res.status(500).json({
            error
        })
    }
}

//OBTENER UN ESTUDIANTE POR EMAIL (ACCESO CON LOGIN)
export const getEstudianteByEmailPassword = async (req,res) => {
    try{
    const email = req.query.email
    const contrasenya = req.query.contrasenya

    const [rows] = await poll.query('SELECT email,contrasenya FROM estudiantes WHERE (email = ?) AND (contrasenya = ?)',[email,contrasenya])
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

//OBTENER UN ESTUDIANTE POR SU ID
export const getEstudianteByID = async (req,res) => {
    try{
        const [rows] = await poll.query('SELECT * FROM estudiantes WHERE id = ?',[req.params.id])

        //devolvemos un mensaje de error si no hemos encontrado nada y cambiamos el status a error 404
        if(rows.length <= 0){
            return res.status(404).json({message: 'Estudiante no encontrado'})
        }
    
        res.json(rows)
    }catch (error){
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
    
}

//CREAR ESTUDIANTE
export const createEstudiante = async (req,res) => {
    try{
        
        const {nombre,apellidos,email,contrasenya,edad,info,foto} = req.body
        
        if(foto == undefined){
            
            const [rows] = await poll.query('INSERT INTO estudiantes (nombre,apellidos,email,contrasenya,edad,info,foto) Values (?,?,?,?,?,?,?);',
            [nombre,apellidos,email,contrasenya,edad,info,foto]);

            res.send(rows)
            
        }else{
            const [rows] = await poll.query('INSERT INTO estudiantes (nombre,apellidos,email,contrasenya,edad,info,foto) Values (?,?,?,?,?,?,UNHEX(?))',
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
//ACTUALIZAR UN ESTUDIANTE
export const updateEstudiante = async (req,res) => {
    try{
        const id = req.params.id
        const {nombre,apellidos,email,contrasenya,edad,info,foto} = req.body
    
        const [result] = await poll.query('UPDATE estudiantes SET nombre = ?, apellidos = ?, email = ?,'+ 
            'contrasenya = ?, edad = ?, info = ?, foto = ? WHERE id = ?',[nombre,apellidos,email,contrasenya,edad,info,foto,id])
    
        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Estudiante no encontrado. Error al actualizar'
            })
        }else{
            return res.sendStatus(240)
        }
    }catch(error){
        return res.status(500).json({
            message: "Error"
        })
    }
    
} 
//BORRAR UN ESTUDIANTE CON ID
export const deleteEstudiante =  async (req,res) => {
    try{
        const [result] = await poll.query('DELETE FROM estudiantes WHERE id = ?',[req.params.id])

        if(result.affectedRows <= 0){
            return res.status(404).json({
                message: 'Estudiante no encontrado. Fallo al eliminar'
            })
        }else{
            //Si no ha entrado en el if
            //Enviamos un 204 indicando un estado de que todo ha ido bien
            return res.sendStatus(204)
        }
    }catch(error){
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
    
    
}

