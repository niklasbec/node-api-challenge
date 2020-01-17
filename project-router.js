const express = require('express')
const router = express.Router()
const Project = require('./data/helpers/projectModel')

router.get('/', (req, res) => {
    Project.get()
        .then(projects => {
            res.status(200).json(projects)
        })
        .catch(error => {
            res.status(500).json({
                error: 'Sorry the server ran into an error'
            })
        })
})

router.post('/', (req, res) => {

    const newProject = req.body

    if(req.body.name && req.body.description) {
    Project.insert(newProject)
        .then(project => {
            res.status(201).json({
                success: 'Successfully created new Project',
                projectInfo: project
            })
        })
        .catch(error => {
            res.status(500).json({
                error: 'Sorry the server ran into an error'
            })
        })
    } else {
        res.status(400).json({
            error: 'Invalid User Data, name and description needed'
        })
    }
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
})



module.exports = router