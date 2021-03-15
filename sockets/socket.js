const { comprobarJWT } = require('../helpers/jwt');
const {io} = require('../index'); //Lo colocamos entre llaves porque es una exportacion con nombre
const { usuarioConectado, usuarioDesconectado, grabarMensaje } = require('../controllers/socket');
//Mensaje de Sockets
io.on('connection', client => { //El client es una computadora que se acaba de conectar a nuestro socket server o a nuestro dispositivo, practicamente cuando recarguemos la pagina se conectara directamente con nuestro servidor de socket,la conexion va caer enla variable client
    console.log('Cliente conectado');
    
    // console.log(client.handshake.headers['x-token']); //Nos saldra varios datos delheader, de ahi capturamos el token

    const [valido, uid ] = comprobarJWT(client.handshake.headers['x-token']); //Jacemos una desestructuracion posicional

    //Verifiva si el token es valido
    if ( !valido ) { client.disconnect(); } //Solo daremos seguimiento a aquellos quetengan eltoken
    
    //Cliente autenticado
    usuarioConectado( uid ); //Actualizo la db y colocamos un campo en true 

    //Ingresa el usuario a una sala en particular
    //sala global, client.id, 603d9f27b21e2b35c4082822 
    client.join( uid ); //Crea un canal para cada cliente

    //Escuchar del cliente el mensaje-personal
    client.on('mensaje-personal', (payload) => {
        // console.log(payload);
        //Grabar mensaje
        grabarMensaje( payload ); //Se envia tal cual es el objeto
        io.to( payload.para ).emit('mensaje-personal', payload ) ;//Va emitir a un canal, sera al canal de receptor
    });


    client.on('disconnect', () => { //Esto sedispara cuandoelcliente se desconecta  
        usuarioDesconectado(uid);
     }); //El .on indica que el servidor esta escucahndo y el emit que va a emitir algo

   //   client.on('mensaje', ( payload ) => { //En caso enscuche un mensaje dentro de esta comunicacion, se activara y aparte emitira un mensajea todos los usaurios por el io. si hubiera sido client. hubiera mandado a ese mismo.
   //      console.log('mensaje', payload);

   //      // client.emit('mensaje', {admin: 'Nuevo mensaje'}); //Emite el mensaje al dispositivo que le envio del mensaje
   //      io.emit('mensaje', {admin: 'Nuevo mensaje'}); //Emite el mensaje a todos los dispositvos conectados al servidor
   //   })

    

  });