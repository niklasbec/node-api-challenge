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

router.get('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const toGet = await Project.get(id)
        if(toGet) {
            Project.get(id)
                .then(project => {
                    res.status(200).json({
                    projectInfo: project
                })
            })
        } else {
            res.status(404).json({
                error: 'Sorry no Project with that ID found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Server Error'
        })
    }
})

router.get('/actions/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const toGet = await Project.get(id)
        if(toGet) {
            Project.getProjectActions(id)
                .then(project => {
                    res.status(200).json({
                    projectActions: project
                })
            })
        } else {
            res.status(404).json({
                error: 'Sorry no Project with that ID found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Server Error'
        })
    }
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

router.delete('/:id', async (req, res) => {
    const { id } = req.params
    
    try {
        const toDelete = await Project.get(id)
        if(toDelete) {
            Project.remove(id)
                .then(project => {
                    res.status(202).json({
                    success: 'Project was removed',
                    projectInfo: project
                })
            })
        } else {
            res.status(404).json({
                error: 'Sorry no Project with that ID found or invalid User Data'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Server Error'
        })
    }
})

router.put('/:id', async (req, res) => {
    const { id } = req.params
    const newData = req.body
    
    try {
        const toUpdate = await Project.get(id)
        if(toUpdate && newData.name && newData.description) {
            Project.update(id, newData)
                .then(project => {
                    res.status(200).json({
                    success: 'Project was updated',
                    projectInfo: project
                })
            })
        } else {
            res.status(404).json({
                error: 'Sorry no Project with that ID found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Server Error'
        })
    }
})

module.exports = router