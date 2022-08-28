const Pool = require('pg').Pool;
const pool = new Pool({
    user: 'me',
    host: 'localhost',
    database: 'api',
    password: 'sove2012',
    port: 5432,
})

const getUsers = (request,response) => {
    pool.query('SELECT * FROM users ORDER BY id ASC', (error,results) => {
        if (error){
            throw error;
        }
        response.status(200).json(results.rows);
    })
}

const getUserById = (request,response) => {
    pool.query('SELECT * FROM users WHERE id = $1',[id],(error,results) => {
        if (error){
            throw error
        }
        console.log("Se pidió un usuario: "+JSON.stringify( results.rows))
        response.status(200).json(results.rows);
    })
}

const createUser = (request,response) => {
    const {name, email, password} = request.body;

    pool.query('INSERT INTO users (name,email,password) VALUES ($1, $2, $3) RETURNING *', [name,email,password], (error,results) => {
        if (error){
            throw error;
        }
        console.log("Se creó un usuario: "+JSON.stringify( results.rows))
        response.status(201).send(results.rows[0])
    })
}

const updateUser = (request,response) => {
    const id = parseInt(request.params.id);
    const {name,email,password} = request.body;

    pool.query('UPDATE users SET name = $1, email = $2, password = $3 WHERE id = $4',[name,email,password,id],(error,results) => {
        if (error){
            throw error
        }
        console.log("Se modificó un usuario: "+JSON.stringify( results.rows))
        response.status(200).send(`Usuario con ID: ${id} modificado`)
    })
}

const deleteUserById = (request,response) => {
    const id = parseInt(request.params.id);
    
    pool.query('DELETE FROM users WHERE id = $1',[id],(error,results)=>{
        if (error){
            throw error
        }
        console.log("Se eliminó un usuario: "+JSON.stringify(id))
        response.status(200).send(`Usuario con ID: ${id} eliminado correctamente.`)
    })
}

module.exports = {
    getUsers,
    createUser,
    deleteUserById,
    getUserById,
    updateUser
}