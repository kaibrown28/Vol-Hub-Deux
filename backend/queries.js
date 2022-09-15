const { response } = require('express');

//creating the pgbouncer pool to connect to POSTGRES database
const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database:'vol_hub_deux',
    password:'postegres',
    port: 5432
});

//get all project admins
const getProjAdmin = (req,res) => {
    pool.query('SELECT * FROM project_admins ORDER BY id ASC', (error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows)
    })
};
//get a singular project admin
const getProjAdminById = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * from project_admins WHERE id = $1', [id], (error,results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};

//create a project admin
const CreateProjAdmin = (req,res) => {
    const {email, name, lookingforvol, phone, projects} = req.body

    pool.query('INSERT INTO project_admins (email, name, lookingforvol, phone, projects) VALUES ($1, $2, $3, $4, $5)', [email, name, lookingforvol, phone, projects], (error, results) =>{
        if (error) {
            throw error
        }
        res.status(201).send(`User added.`)
    })
};

//update project administrator
const updateProjAdmin = (req,res) => {
    const id = parseInt(req.params.id)
    const {email, name, lookingforvol, phone, projects} = req.body

    pool.query(
        'UPDATE project_admins SET email = $1, name = $2, lookingforvol = $3, phone = $4, projects = $5 WHERE id = $6', 
        [email, name, lookingforvol, phone, projects, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with id: ${id}`)
        }
    )
};

//Delete a project administrator
const deleteProjAdmin = (req,res) =>{
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM project_admins WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}

//exporting CRUD for project_admins table

module.exports = {
    getProjAdmin,
    getProjAdminById,
    CreateProjAdmin,
    updateProjAdmin,
    deleteProjAdmin,
}