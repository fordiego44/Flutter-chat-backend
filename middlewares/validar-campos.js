const { validationResult } = require("express-validator");

const validarCampos = ( req, res, next) => {

    const errores = validationResult( req );

    if (!errores.isEmpty()) { //Si hay errores retornar el error, con el middleware establecido en rutas
        return res.status(400).json({ //El status 400 significa que es un bad request
            ok:false,
            errors:errores.mapped() //Se detallan los errores con el mapped()
        });
    }

    

    next(); //En caso cumpla esta condicion pasara a la siguiente condicion o al controlador
}

module.exports = {
    validarCampos
}