const jwt = require('jsonwebtoken');


const validarJWT  = ( req, res, next) => {

    const token = req.header('x-token'); //BuSCAMOS EN EL header el x-token declaracdo en la peticion
    
    console.log(token);
    if (!token) {
        res.status(401).json({ //401 significa que no se enviaron las credenciales
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const {uid} = jwt.verify( token , process.env.JWT_KEY )
        req.uid = uid;
        next();
    } catch (error) {
        res.status(401).json({ //401 significa que no se enviaron las credenciales
            ok: false,
            msg: 'Token no valido'
        });
    }
    
}

module.exports ={
    validarJWT
}