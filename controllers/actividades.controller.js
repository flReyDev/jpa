const { request, response } = require("express");
const Actividades = require('../models/Actividades');
const Materiales = require("../models/Materiales");

/**
 * Funcion que recupera todos los materiales 
 * Ruta: GET /actividad/all
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const geAllActividades = async (req = request, res=response)=>{
   try {
        
    const actividades = await Actividades.findAll({
        include:[ {
            model: Materiales
        } ]
    })

    if(actividades.length < 1) return res.status(404).json({ error: 'No existen registros disponibles!!!' })
    
    res.status(200).json({ actividades })
   } catch (error) {
    res.status(400).json({error})
   }
}

/**
 * Funcion que recupera una actividad segun su identificado 
 * Ruta: GET /actividad/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
const getActividad = async (req = request, res=response)=>{
    let { id } = req.params;
    try {
     const actividades = await Actividades.findAll({
         include:[ 
            {
                model: Materiales
            }
         ],
         where:{
            id
         }
     })
     if(actividades.length < 1) return res.status(404).json({ error: 'No existen el registros solicitado!!!' })
     res.status(200).json({ actividades })
    } catch (error) {
     res.status(400).json({error})
    }
 }


/**
 * Funcion que permite crear un nuevo registro 
 * Ruta: POST /actividad/create
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const postActividad= async (req = request, res=response)=>{

    let { descripcion } = req.body;
    try {
     const actividades = await (await Actividades.create({descripcion})).save();
 
     if(actividades.length < 1) return res.status(404).json({ error: 'Error al intentar registrar el nuevo material!!!' })
     
     res.status(200).json({ actividades })
    } catch (error) {
     res.status(400).json({error})
    }
 }

 /**
 * Funcion que permite actualizar un registro  dado el codigo del material 
 * Ruta: PUT /actividad/update
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const updatedActividad = async (req = request, res=response)=>{

    let { id, descripcion} = req.body;
    try {
     const actividad = await Actividades.findOne({ 
        where:{ 
            id
        }
     })
     actividad.descripcion = descripcion;

     const actividadUpdate = await actividad.save();

     if(actividadUpdate.length < 1) return res.status(404).json({ error: 'No se pudo actualizar el registrol!!!' })
     
     res.status(200).json({ actividadUpdate })
    } catch (error) {
     res.status(400).json({error})
    }
 }

/**
 * Funcion que permite elimnar un registro 
 * Ruta: DELETE /actividad/delete/:id
 * @param {request} req 
 * @param {response} res 
 * @returns Json()
 */
 const deleteActividad = async (req = request, res=response)=>{
    let { id } = req.params;
    try {
     const actividad = await Actividades.destroy({ 
        where:{ 
            id
        }
     })
     if(actividad.length < 1) return res.status(404).json({ error: 'No se pudo eliminar el registrol!!!' })
     res.status(200).json({ actividad })
    } catch (error) {
     res.status(400).json({error})
    }
 }

module.exports = {
    getActividad,
    geAllActividades,
    postActividad,
    updatedActividad,
    deleteActividad
}