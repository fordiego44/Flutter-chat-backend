/* 


    path: api/login 



    */  
const { Router} = require('express'); //De express sacamos esta variable(que es funcion ) que me permite generar rutas
const { check } = require('express-validator'); //Usamos esta variable de este paquete para las validaciones


const { crearUsuario, login, renewToken } = require('../controllers/auth');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

// Usamos response en casono estamos trabajando con typescript

const router = Router();


//El response le asignamos al res
router.post('/new',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(), //Esto es un middleware y se ejecutara cuando no encuentre el nombre del req. //El not y el isEmpty son las condiciones de mi validacion
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], crearUsuario  );//Se coloca el path(ruta y nos retorna un callback o funcion)

router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos,
], login );

router.get('/renew', validarJWT ,renewToken );

module.exports = router;