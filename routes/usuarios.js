/* 


    path: api/usuarios 



    */  
    const { Router } = require('express'); //De express sacamos esta variable(que es funcion ) que me permite generar rutas
    const { getUsuarios } = require('../controllers/usuarios');
 
    const { validarJWT } = require('../middlewares/validar-jwt');
    
    // Usamos response en casono estamos trabajando con typescript
    
    const router = Router(); 
     
    router.get('/', validarJWT , getUsuarios );
    
    module.exports = router;