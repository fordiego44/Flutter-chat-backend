const { Schema, model } = require('mongoose');
//Schema me permitira crear el modelo, y model es lo que que se vera hacia afuera

const UsuarioSchema = Schema({

    nombre:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique: true
    },
    password:{
        type: String,
        required: true,
    },
    online:{
        type: Boolean,
        default: false, //Por defecto sera falso, no requerido
    }
});

UsuarioSchema.method('toJSON', function(){ //No colocamos funcion de flecha porque no modifica el this, la funcion tradicional si lo hace
//Cuando en el res usamos el .json({}) se activa el toJSON de arriba
    const { _id, __v, password, ...object } = this.toObject(); //Los 3 puntos indican 'lo restante' y esta dentro de object
    object.uid = _id;
    return object; //En el response ya no devolvera todo, ahora estara personalizado de esta manera
});
module.exports = model('Usuario', UsuarioSchema); //Siempre con mayuscula el Usuario