require('dotenv').config();
const express = require('express');
const app = express();

app.use(express.static('dist'));
app.use(express.json());

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

app.get('/api/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
        .then(person => {
            if (person) {
                response.json(person);
            } else {
                response.status(404).json({ error : 'there is no such person'});
            }
        })
        .catch(error => next(error));
});

app.post('/api/persons', (request, response) => {
    const body = request.body;

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

    person.save()
        .then(savedPerson => {
            response.json(savedPerson);
        });

});

app.put('/api/persons/:id', (request, response, next) => {
    const { name, number } = request.body;

    Person.findById(request.params.id)
        .then(person => {
            if (!person) {
                return response.status(404).end();
            }

            person.name = name;
            person.number = number;

            return person.save().then(updatedPerson => {
                response.json(updatedPerson);
            });
        })
        .catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id)
    .then(result => {
        response.status(204).end();
    })
    .catch(error => next(error));
});

app.get('/info', (request, response) => {
    Person.find({}).then(persons => {
        response.send(`Phonebook has info for ${persons.length}</br> ${new Date()}`);
    });
});

const errorHandler = (error, request, response, next) => {
    console.log('in error handler');
    console.error(error.message);

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformed id' });
    }

    next(error);
}

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

// app.get('/api/persons/:id', (request, response) => {
//     const id = request.params.id;

//     const person = persons.find(person => person.id === id);

//     if (person) {
//         response.json(person);
//     } else {
//         response.status(404).send('Person not found');
//     }
// });

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