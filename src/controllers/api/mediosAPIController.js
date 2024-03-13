const path = require('path');
const db = require('../../database/models');

const mediosAPIController = {
    'list': async(req, res) => {
        try {
            const medios= await db.Medio.findAll()
        if (medios=="") {
            throw new Error("No se han encontrado tipos de medios de grabación registrados")
        }
        res.status(200).json(medios)
   
        } catch (error) {
            res.status(400).send(error.message)
        }
        
    }
}
module.exports = mediosAPIController;