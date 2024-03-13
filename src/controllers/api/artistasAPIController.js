const path = require('path');
const db = require('../../database/models');

const artistasAPIController = {
    'list': (req, res) => {
        db.Artista.findAll()
        .then(artist=>{
            res.status(200).json(artist)
        })
    },
    create: async (req,res) => {
        try {
            const artist = await db.Artista.create(req.body);
            if (!artist) {
                throw new Error("Debe ingresar datos válidos")
            }
            console.log("artist", artist);
            return res.status(200).json(artist)
        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    update: async(req,res) => {
        try {
            const id = parseInt(req.params.id);
            if(!Number.isInteger(id)){
                throw new Error(`"${req.params.id}" no es un término válido como ID, debe ingresar un número entero`)
            }
            const artist = await db.Artista.findByPk(id)

            if (!artist) {
                throw new Error("Artista inexistente")
            }

            await artist.update(req.body)
            return res.status(200).json(artist)

        } catch (error) {
            res.status(400).send(error.message)
        }
    },
    destroy: async(req,res) => {
       try {
        const id = parseInt(req.params.id);
            if(!Number.isInteger(id)){
                throw new Error(`"${req.params.id}" no es un término válido como ID, debe ingresar un número entero`)
            }

            const artist = await db.Artista.findByPk(id);

            if (!artist) {
                throw new Error("Artista inexistente")
            }

            await artist.destroy()

            res.status(200).json({"Eliminado":artist})
       } catch (error) {
        res.status(400).send(error.message)
       }
    }
}
module.exports = artistasAPIController;