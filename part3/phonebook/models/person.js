const mongoose = require('mongoose');

mongoose.set('strictQuery', false);

const url = process.env.MONGODB_URI;

console.log('connecting to', url);
mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting', error.message);
    });

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: [3, 'Name has to be at least 3 characters long.'],
        required: true,
    },
    number: {
        type: String,
        validate: {
            validator: function(v) {
              return /^(?=.{8,}$)\d{2,3}-\d+$/.test(v);
            },
            message: props => `${props.value} is not a valid phone number!
            xxx-xxxxxxxxx+`,
        },
        // minLength: [8, 'Number has to be at least 8 characters long.'],
        required: true,
    },
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);