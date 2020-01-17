const express = require('express')
const helmet = require('helmet')
const cors = require('cors')


const port = process.env.PORT || 4000

const server = express()

server.use(express.static('client/build'))
server.use(helmet())
server.use(cors())
server.use(express.json())

const projectRouter = require('./project-router')
server.use('/api/projects', projectRouter)

const actionRouter = require('./action-router')
server.use('/api/actions', actionRouter)

server.listen(port, () => {
    console.log('\n*** Server Running on http://localhost:4000 ***\n');
  });

server.use('*', (req, res) =>
res.status(404).json({
  status: 404,
  message: 'No endpoint matches that URL.'
}))