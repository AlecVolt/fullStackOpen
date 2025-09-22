require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.json());
app.use(express.static('dist'));

const morgan = require('morgan');

const Person = require('./models/person');

morgan.token('person', (request, response) => {
    return request.body && Object.keys(request.body).length
    ? JSON.stringify(request.body)
    : "";

});

// app.use(morgan('tiny'));
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'));

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons);
    });
});

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person);
    });
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

    if (!body) {
        return response.status(400).json(
            { error: 'Content missing' }
        );
    }

    if (!body.name) {
        return response.status(400).json(
            { error: 'Name is missing' }
        );
    }

    if (!body.number) {
        return response.status(400).json(
            { error: 'Number is missing' }
        );
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    });

    person.save().then(savedPerson => {
        response.json(savedPerson);
    })
});

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`Phonebook has info for ${persons.length}</br> ${new Date()}`);
    });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.get('/', (request, response) => {
//     response.send('<h1>Welcome to the Phonebook API</h1>');
// });

// app.get('/info', (request, response) => {
//     const infoText = `Phonebook has info for ${persons.length}</br> ${new Date()}`;
//     response.send(infoText);
// });

// app.get('/api/persons', (request, response) => {
//     response.json(persons);
// });

// app.get('/api/persons/:id', (request, response) => {
//     const id = request.params.id;

//     const person = persons.find(person => person.id === id);

//     if (person) {
//         response.json(person);
//     } else {
//         response.status(404).send('Person not found');
//     }
// });

// app.delete('/api/persons/:id', (request, response) => {
//     const id = request.params.id;
//     persons = persons.filter(person => person.id !== id);

//     response.status(204).end();
// });

// const generateId = () => {
//     return String(Math.floor(Math.random() * 10000));
// }

// app.post('/api/persons', (request, response) => {
//     const body = request.body;

//     if (!body) {
//         return response.status(400).json(
//             { error: 'Content missing' }
//         );
//     }

//     if (!body.name) {
//         return response.status(400).json(
//             { error: 'Name is missing' }
//         );
//     }

//     if (!body.number) {
//         return response.status(400).json(
//             { error: 'Number is missing' }
//         );
//     }

//     if (persons.find(person => person.name === body.name)) {
//         return response.status(400).json(
//             { error: 'Name must be unique' }
//         );
//     }

//     const person = {
//         name: body.name,
//         number: body.number,
//         id: generateId(),
//     }

//     persons.concat(person);
//     console.log(persons);

//     response.json(person);
// });