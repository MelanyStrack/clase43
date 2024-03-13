const path = require('path');
const db = require('../../database/models');

const cancionesAPIController = {
    'list': async(req, res) => {
        try {
        
            const canciones= await db.Cancion.findAll({include:["genero","medio"]})
    
        if (canciones=="") {
            throw new Error("No se han encontrado canciones registrados")
        }
        res.status(200).json(canciones)
        } catch (error) {
            res.status(400).send(error.message)
        }
        
    }
}
module.exports = cancionesAPIController;