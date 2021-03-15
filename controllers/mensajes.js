const { response } = require("express");
const Mensaje = require("../models/mensaje");

    const obtenerChat = async ( req, res ) => {
       
        const miId = req.uid; //Vendra del request
        const mensajesDe = req.params.de; //Vendra del parametro, es el id del receptor

        const last30 = await Mensaje.find({
            $or: [{ de: miId, para: mensajesDe }, { de: mensajesDe, para: miId }] //Condicion de or , lo colocamos porque son 2 campos , y tenemos que traerlos a todos tomando en cuenta esto
        })
        .sort({ createdAt: 'desc' }) //Ordenamos por fecha
        .limit(30); //Los ultimos 30

        res.json({
            ok:true, 
            mensajes: last30
        });
    }

module.exports = {
    obtenerChat 
}