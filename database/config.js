const mongoose = require('mongoose');

const dbConnection = async () => { //Los async await son parecidos a dart, en este caso usamos try catch porque no podemos controlar la db de la nube, y si ocurre cualquier cosa nos avisara en el (error)

    try {
        await mongoose.connect(process.env.DB_CNN,{ //Hacemos la conecion con labase de datos, nos pedita el url que esta como variable de entorno
            useNewUrlParser: true, //Esta conecion es un future asi que esperaremos a que haga la conexion 
            useUnifiedTopology: true, //Son configuracion de mongo estas 3 que ercomienda poner Mongo
            useCreateIndex: true //
        });

        console.log('DB Online');
    } catch (error) {
        console.log(error);
        throw new Error('Error en la base de datos - Hable con el admin'); //Esto parara toda la aplicacion 
    }
}


module.exports = { //Para utilizarlo en otras archivos debo exportar la variable
    dbConnection
}