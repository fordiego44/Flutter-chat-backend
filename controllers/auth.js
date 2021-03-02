const { response } = require("express"); 
const bcrypt = require("bcryptjs");  //Para encriptar contraseñas

const Usuario = require('../models/usuario'); 
const { generarJWT } = require('../helpers/jwt'); 

const crearUsuario = async ( req, res = response) => {
    //De ese callback siempre recibimos el request y el response.
 
    const { email, password } = req.body; //Extraemos solo el email mediante la desestructuracion, tambien podiamos aver hecho lo siguiente req.body.email 

    try { //Utilizamos un try catch porque no sabemos lo que pueda pasar, talvez se cae el servidor de atlas etc

        const existeEmail = await Usuario.findOne({email}); //podemos colocar email o email:email, pero es redundadnte, findOne: buscamos uno, buscamos en la bd a travez de nuestro modelo, hacer esta peticion es una promesa

        if ( existeEmail ) {
            return res.status(400).json({ //400 es un bad request
                ok:false,
                msg:'El correo ya esta registrado'//No seria adecuadocolocar estemensaje porq estariamos dando informacion, podriamos colocar 'las credenciales no son validas'
            });
        }

        //Una vez que pase por las validaciones entonces procedemos a crear el usuario
        const usuario = new Usuario( req.body ); //Enviamos el body y lo que hara es filtrar los campos de ese modelo, lo demas lo oviará
        
        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();  //salt es usado en criptologia  paragenerarnumeros de manera aleatoria, sihay 2 contraseñas iguales, esta hara un salt distinto a los dos.
        usuario.password = bcrypt.hashSync( password, salt); //empieza a encriptar nuestra contraseña con el salt, obtenemos una contraseña hasheada


        await usuario.save(); //Es una proemsa asi que colocamos un await
        
        //GENERAR JWT
        const token = await generarJWT( usuario.id ); //El esquema de Mongoose sabe que es el _id

        //Con el response podre hacer tipado json, es la respuesta que yo doy al front end
        res.json({
            ok:true,
            usuario,
            token
            // msg:'Crear usuario !!!'
        });
   
    } catch (error) {
        console.log(error);
        res.status(500).json({ //Error 500 es error del servidor
            ok: false,
            msg:'Hable con el administrador'
        });
    } 
    
}

const login = async ( req, res = response ) =>{ //response te envia en formato json si quiero el tipado, tambien recibo el req y el res

    const { email, password } = req.body;

    try { //Try catch si hay algun problema en el proceso
        const usuarioDB = await Usuario.findOne({email});

        if (! usuarioDB) {
            return res.status(404).json({ //Error de request, no se encontro el usaurio
                ok:false,
                msg:'Email no encontrado' 
            });
        }

        //Validar el password
        const validPassword = bcrypt.compareSync(password, usuarioDB.password); //retorna un boleano
        if (!validPassword) {
            return res.status(400).json({ //Error de bad request 
                ok:false,
                msg:'La contraseña no es valida' 
            });
        }

        //Generar el JWT
        const token = await generarJWT( usuarioDB.id ); 
        
        res.json({
            ok:true,
            usuario:usuarioDB,
            token
        });


    } catch (error) {
        console.log(error);
        return res.status(500).json({ //Error de servidor: 500
            ok:false,
            msg:'Hable con el administrador' 
        });
    } 
}

const renewToken = async ( req, res = response) => {
    //const uid uid del usuario
    const uid = req.uid;

    //generar un nuevo JWT, generarJWT, ...uid... 
    const token = await generarJWT( uid ); 

    //Obtener el usuario por el UID, Usuario.findById...
    const usuarioDB = await Usuario.findById(uid);
    
    res.json({
        ok:true,
        usuario:usuarioDB,
        token
    });
};

module.exports = {
    crearUsuario,
    login,
    renewToken
}