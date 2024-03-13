const path = require('path');
const db = require('../../database/models');

const albumesAPIController = {
    'list': async (req, res) => {
    try {
    let albums = ""
    await db.Album.findAll({include:["artista"]}).then(albumes=>albums=albumes) 
    if (!albums) {
        throw new Error ("No se han encontrado albumes registrados")
    }
    res.status(200).json(albums)

} catch (error) {
    return res.status(400).send(error.message)
}

    },

    'detail': async(req, res) => {
        try {
            const id = parseInt(req.params.id);
        if(!Number.isInteger(id)){
            throw new Error(`"${req.params.id}" no es un término válido como ID, debe ingresar un número entero`)
        }
             
        let albumDetail=""
    await db.Album.findAll({where:{id_artista:id}})
    .then(album=>{
        albumDetail=album
    })
    if (!albumDetail) {
        throw new Error("Album inexistente")
    }

    let foundArtist =""
    await db.Artista.findByPk(id).then(artist=> foundArtist=artist)
    console.log("artista? ",foundArtist);
    if (!foundArtist) {
        console.log("artista? ",foundArtist);
        throw new Error("Artista inexistente")
    }
    res.status(200).json({"Albúm":albumDetail, "Artista":foundArtist.nombre})
    } catch (error) {
            res.status(400).send(error.message)
        }
        
        
    }
}

module.exports = albumesAPIController;