'use strict'

const fastify = require('fastify')()

fastify.register(require('../.'))

fastify.ready((err) => {
    if (err) throw err

    console.log('Server started.')

    fastify.wsapix.on('connect', (client) => {
        console.log('Client connected.')

        client.send('hellow from server') // Creates an echo server
    })
})

fastify.listen(34567)
