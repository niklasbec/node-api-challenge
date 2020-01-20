const express = require('express')
const router = express.Router()
const Action = require('./data/helpers/actionModel')

router.get('/', (req, res) => {
    Action.get()
        .then(actions => {
            res.status(200).json(actions)
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
        const toGet = await Action.get(id)
        if(toGet) {
            Action.get(id)
                .then(action => {
                    res.status(200).json({
                    actionInfo: action
                })
            })
        } else {
            res.status(404).json({
                error: 'Sorry no Action with that ID found'
            })
        }
    } catch {
        res.status(500).json({
            error: 'Server Error'
        })
    }
})

router.post('/:id', async (req, res) => {
        const { id } = req.params
        const newAction = {project_id: id, ...req.body}

        try {
            const getProject = await Action.get(id)
            if(getProject && req.body.notes && req.body.description) {
                Action.insert(newAction)
                    .then(action => {
                        res.status(201).json({
                            success: 'Successfully created new Action',
                            actionInfo: action
                        })
                    })
                    .catch(error => {
                        res.status(500).json({
                            error: 'Sorry the server ran into an error'
                        })
                    })
            } else {
                res.status(400).json({
                    error: 'Invalid user data or the provided ID doesnt exist'
                })
            }
        } catch (error) {
                res.status(500).json(error.message)
        }
    })

    router.delete('/:id', async (req, res) => {
        const { id } = req.params
        
        try {
            const toDelete = await Action.get(id)
            if(toDelete) {
                Action.remove(id)
                    .then(action => {
                        res.status(202).json({
                        success: 'Action was removed',
                        actionInfo: action
                    })
                })
            } else {
                res.status(404).json({
                    error: 'Sorry no Action with that ID found'
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
            const toUpdate = await Action.get(id)
            if(toUpdate && newData.notes && newData.description) {
                Action.update(id, newData)
                    .then(action => {
                        res.status(200).json({
                        success: 'Action was updated',
                        actionInfo: action
                    })
                })
            } else {
                res.status(404).json({
                    error: 'Sorry no Action with that ID found or invalid User Data'
                })
            }
        } catch {
            res.status(500).json({
                error: 'Server Error'
            })
        }
    })


module.exports = router