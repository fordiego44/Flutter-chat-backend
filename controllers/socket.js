const Mensaje = require("../models/mensaje");
const Usuario = require("../models/usuario")

const usuarioConectado = async ( uid = '') => { //Es funcion la ejecutaremos cuando un usuario se conecte, estara siendo usado en eldirectorio sockets/socket
//Es una funcion de flechas

    const usuario = await Usuario.findById(uid);
    usuario.online = true;
    await usuario.save(); //Actualiza los datos en la base de datos
    return usuario;

}

const usuarioDesconectado = async ( uid = '') => { //Es funcion la ejecutaremos cuando un usuario se conecte, estara siendo usado en eldirectorio sockets/socket
    //Es una funcion de flechas
    
        const usuario = await Usuario.findById(uid);
        usuario.online = false;
        await usuario.save(); //Actualiza los datos en la base de datos
        return usuario;
}

const grabarMensaje = async ( payload ) => { //Es funcion la ejecutaremos cuando un usuario se conecte, estara siendo usado en eldirectorio sockets/socket
     
        try { 
            const mensaje = new Mensaje( payload );
            await mensaje.save();
            
            return true; 
        } catch (error) {
            return false;
        }
}

module.exports = {
    usuarioConectado,
    usuarioDesconectado,
    grabarMensaje
}