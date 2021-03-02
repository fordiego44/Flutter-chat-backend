const jwt = require('jsonwebtoken');



const generarJWT = ( uid ) => { //Generamos una funcion
    
    return new Promise((resolve, reject) => {
        
        const payload = { uid }; //Esta constante es un ya sabes xd

        jwt.sign( payload, process.env.JWT_KEY,{ //Todo esto es un callback, que deberian convertirlo en promesa, como no tiene esto lo hacemos manualemnte encerrando todo esto en una promesa 
            expiresIn : '24h' //Nuestro token expira en 24 horas
        }, ( err, token ) => {
            if ( err ) {
                //No se pudo crear el token
                reject('No se pudo generar el JWT');    //Es como el catch del try cath
            }else{
                //TOKEN!
                resolve( token ); //Significa que todo estuvo bien, y nos retornara el token( nuestro informacion todo encriptado)
            }
        })

    });
}

module.exports = {
    generarJWT
}