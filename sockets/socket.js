const {io} = require('../index'); //Lo colocamos entre llaves porque es una exportacion con nombre
//Mensaje de Sockets
io.on('connection', client => { //El client es una computadora que se acaba de conectar a nuestro socket server o a nuestro dispositivo, practicamente cuando recarguemos la pagina se conectara directamente con nuestro servidor de socket,la conexion va caer enla variable client
    console.log('Cliente conectado');
    
    client.on('disconnect', () => { //Esto sedispara cuandoelcliente se desconecta 
        console.log('Cliente desconectado');
     }); //El .on indica que el servidor esta escucahndo y el emit que va a emitir algo

   //   client.on('mensaje', ( payload ) => { //En caso enscuche un mensaje dentro de esta comunicacion, se activara y aparte emitira un mensajea todos los usaurios por el io. si hubiera sido client. hubiera mandado a ese mismo.
   //      console.log('mensaje', payload);

   //      // client.emit('mensaje', {admin: 'Nuevo mensaje'}); //Emite el mensaje al dispositivo que le envio del mensaje
   //      io.emit('mensaje', {admin: 'Nuevo mensaje'}); //Emite el mensaje a todos los dispositvos conectados al servidor
   //   })

    

  });