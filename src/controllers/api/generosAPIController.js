const path = require('path');
const db = require('../../database/models');

const genresAPIController = {
    'list':async (req, res) => {
        try {
            const genres= await db.Genero.findAll()
        if (genres=="") {
            throw new Error("No se han encontrado géneros registrados")
        }
        res.status(200).json(genres)
   
        } catch (error) {
            res.status(400).send(error.message)
        }
        
    }
}
module.exports = genresAPIController;