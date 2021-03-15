const { response } = require("express");
const Usuario = require("../models/usuario");

const getUsuarios = async (req, resp = response) => {

        const desde = Number( req.query.desde) || 0; //Si no envia nada en el query se reemplaza por 0
        const usuarios = await Usuario //Vamos concatenando metodos con el punto
                                .find({ _id: { $ne : req.uid }}) //Dentro del find podemos colocar condiciones y filtros, por defecto toma todo si lo dejamos asi: find(), llamado 'not existing'
                                .sort('-online')//sort ordena y si se trata de un booleano se coloca - si ordenamos de true a false con elnpmbre del campo
                                .skip(desde) //Esto sirve paralaapginacion, indicamos desde donde queremos mostrarlos registros
                                .limit(5); //Indicamos cuando registros queremos obtener desde el 'desde'
                                // req.uid: lo obtenemos no de la peticion, sino que antes paso por un middleware para verificar eltoken y ahi declaramos el req.uid
        return resp.json({
            ok:true,
            usuarios: usuarios 
        });
}

module.exports = {
    getUsuarios
}