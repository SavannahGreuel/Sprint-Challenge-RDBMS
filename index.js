const express = require('express');
const knex = require('knex');

const knexConfig = require('./knexfile.js');

const db = knex(knexConfig.development);

const server = express();

server.use(express.json());



//endpoints for projects
server.get('/api/projects', (req, res) => {
    db('projects')
      .then(project => res.status(200).json(project))
      .catch(err => res.status(500).json(err));
  });

server.post('/api/projects', (req, res) => {
    const project = req.body;

    db('projects')
        .insert(project)
        .returning('id')
        .then(ids => {
            res.status(201).json({message: 'successfuly added project with the id of...', ids});
        })
        .catch(error => {
            res.status(500).json({message: 'error inserting', error})
        })
});


//endpoints for actions
server.post('/api/projects/actions', (req, res) => {
    const action = req.body;

    db('actions')
        .insert(action)
        .returning('id')
        .then(ids => {
            res.status(201).json({message: 'successfuly added action with the id of...', ids});
        })
        .catch(error => {
            res.status(500).json({message: 'error inserting', error})
        })
});


//test endpoint
server.get('/', (req, res) => {
    res.json({ api: 'up' });
  });
  

//defines port  
  server.listen(9000, () => console.log('\n== Port 9k ==\n'));