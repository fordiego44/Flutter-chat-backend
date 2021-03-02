const express = require('express'); //Es como una importacion comun y corriente como flutter
const path = require('path');//Este paquete viene junto con node, no hay que instalar nada 
require('dotenv').config(); //Va leer nuestro archivo .env y establecer las variables de entorno
//Dentro del config() podemos establecer ciertas configuracion pero no es obligatorio


//DB Config
// const {dbConnection} = require('./database/config');
// dbConnection();
require('./database/config').dbConnection();



//App de Express
const app = express(); //Con esto creamos la aplicacion, y estamos listos para escuchar peticiones


//Lectura y parseo del body
app.use( express.json() ); //Parseamos las peticiones http que vienen de afuera


//Node Server
// Creamos el servidor de socket en si es de node Node Server
const server = require('http').createServer(app); //El paquete http es propio de node, no instalamos nada solo elpaquete de socket.io, Esto crea el servidor de socket pero todavia no hay ningunaconecion con nuestra aplicacion de express
module.exports.io = require('socket.io')(server); //Aqui viene la propia configuracion del server socket io (in out, informacion que entra y que sale)
//Lo de arriba anteriormente era una constante pero como el require de abajo pedio un io(salia error),teniamos que exportalo, para obtenerlo en el otro archivo vamos a configurarlo
 

//Mensaje de Sockets
require('./sockets/socket'); //De esta manera importamos el codigo de ese archivo que anteriormente estaba aqui


//Path publio
const publicPath = path.resolve( __dirname, 'public' ); //Con el __dirname obtener eldirectorio donde nos encontramos ya sea en nuestro local o un dominio, y luego especificamos a que archivo se tiene que dirigir
app.use( express.static( publicPath ) ); //Ahora cuando se haga una peticion cualquiera que corra esto


//Mis rutas
app.use('/api/login', require('./routes/auth')) //2 parametros, El 1ero sera el path con el que llamaremos, 2do es elpath alque voy a responder



// app.listen( 3000, ( err ) => { //Estare escuchando a travez del puerto 3000 y retornara un callback
// app.listen( process.env.PORT, ( err ) => { //Podemos usar las variables de entorno gracias a la importacion de dotenv
server.listen( process.env.PORT, ( err ) => { //Para conectarle a nuestro server de socket
//Este callback retornara un error si sucede si el puerto esta tomado o cualquier otra cosa.
    if ( err ) throw new Error( err ); //Si hay errores saldra esto, caso contrario lo de abajo
    console.log('Servidor corriendo en puerto!!!', process.env.PORT);
});