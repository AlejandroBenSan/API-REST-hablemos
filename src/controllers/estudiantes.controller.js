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

export const createEstudiante = async (req,res) => {
    try{
        const {nombre,apellidos,email,contrasenya,edad,info,foto} = req.body
        if(foto === null){
            const [rows] = await poll.query('INSERT INTO estudiantes (nombre,apellidos,email,contrasenya,edad,info,foto) Values (?,?,?,?,?,?,?)',
            [nombre,apellidos,email,contrasenya,edad,info,fotoBytes])
        }else{
            const fotoBytes = Buffer.from(foto,'base64')
            //PARA HACER PETICIONES A LA BASE DE DATOS SIEMPRE HABRA QUE PONER EL ASYNC / AWAIT
            const [rows] = await poll.query('INSERT INTO estudiantes (nombre,apellidos,email,contrasenya,edad,info,foto) Values (?,?,?,?,?,?,?)',
            [nombre,apellidos,email,contrasenya,edad,info,fotoBytes])
        }
        
        res.send(rows)
    }catch (Error){
        return res.status(500).json({
            message: 'Algo ha ido mal'
        })
    }
    
}

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
            message: 'Algo ha ido mal'
        })
    }
    
} 

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

