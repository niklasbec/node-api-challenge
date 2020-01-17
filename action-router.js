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


module.exports = router