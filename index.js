const express = require('express');
const bodyParser = require('body-parser');
const { response } = require('express');
const app = express();
const port = 7000;
const db = require('./queries');
const cors = require('cors');

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
        extended:true,
    })
)
app.use(cors({
    origin: "*"
}))

app.get('/', (request, response) => {
    response.json({info:'API hecho con postgreSQL, Express y Node.js'})
}) 


app.get('/usuarios',db.getUsers);
app.post('/usuarios',db.createUser);
app.delete('/usuarios/:id',db.deleteUserById);
app.get('/usuarios/:id',db.getUserById);
app.put('/usuarios/:id',db.updateUser);


app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto: ${port}`);
})