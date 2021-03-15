/*
    Path : /api/mensajes
*/ 
    const { Router } = require('express'); //De express sacamos esta variable(que es funcion ) que me permite generar rutas
    const { validarJWT } = require('../middlewares/validar-jwt');
    
    const { obtenerChat } = require('../controllers/mensajes');
    
    
    const router = Router(); 
     
    router.get('/:de', validarJWT, obtenerChat );
    
    module.exports = router;