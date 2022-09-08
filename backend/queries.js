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
    pool.query('SELECT * FROM project_administrators ORDER BY id ASC', (error, results) => {
        if (error){
            throw error
        }
        res.status(200).json(results.rows)
    })
};
//get a singular project admin
const getProjAdminById = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('SELECT * from project_adminstrators WHERE id = $1', [id], (error,results) => {
        if (error) {
            throw error
        }
        res.status(200).json(results.rows)
    })
};

//create a project admin
const CreateProjAdmin = (req,res) => {
    const {name, email, projects, organization, looking for volunteers} = req.body

    pool.query('INSERT INTO project_administrators (name, email, projects, organization, looking for volunteers) VALUES ($1, $2, $3, $4, $5) RETURNING *')
        if(error) {
            throw error
        }
        res.status(201).send(`User added with ID: ${results.rows[0].id}`)
    })
};

//update project administrator
const updateProjAdmin = (req,res) => {
    const id = parseInt(req.params.id)
    const {name, email, projects, organization, looking for volunteers} = req.body

    pool.query(
        'UPDATE project_administrators set name = $1, email = $2, projects = $3, organization = $4, looking for volunteers = $5, id = $6',
        [name, email, projects, projects, organization, looking for volunteers, id],
        (error, results) => {
            if (error) {
                throw error
            }
            res.status(200).send(`User modified with ID: ${id}`)
        }
    )
};

//Delete a project administrator
const deleteProjAdmin = (req,res) =>{
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM project_administrators WHERE id = $1', [id], (error, results) =>{
        if(error){
            throw error
        }
        res.status(200).send(`User deleted with ID: ${id}`)
    })
}ß