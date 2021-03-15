const { Schema, model } = require('mongoose');
//Schema me permitira crear el modelo, y model es lo que que se vera hacia afuera

const MensajeSchema = Schema({

    de:{ //El de viene de un usaurio de la bd, es un objeto, apuntara a un id de mis coleccion de Usuarios
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },
    para:{
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true,
    },  
    mensaje:{
        type: String,
        required: true,
    },  
    // fecha:{ //No lo usaremos,el timestamps si
    //     type: Date,
    //     default: new Date(),
    // } 
}, { //Es una configuracion adicional al Schema
    timestamps: true //Para colocar la fecha de insercion por defecto de moongose
});

MensajeSchema.method('toJSON', function(){ //No colocamos funcion de flecha porque no modifica el this, la funcion tradicional si lo hace
//Cuando en el res usamos el .json({}) se activa el toJSON de arriba
    const { _id, __v, ...object } = this.toObject(); //Los 3 puntos indican 'lo restante' y esta dentro de object
    return object; //En el response ya no devolvera todo, ahora estara personalizado de esta manera
});
module.exports = model('Mensaje', MensajeSchema); //Siempre con mayuscula el Usuario