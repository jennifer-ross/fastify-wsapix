'use strict'

const test = require('tap').test
const WebSocket = require('ws')
const fastifyWsapix = require('.')

test('expose a WebSocket', (t) => {
    t.plan(4)

    const fastify = require('fastify')()
    const fastifyWsapix = require('.')
    const wsx = require('wsapix')
    const path = '/'

    fastify.register(fastifyWsapix, {
        engine: 'ws',
    })

    fastify.ready((err) => {
        t.error(err)

        fastify.wsapix.on('connect', (client) => {
            client.send('hello client')

            fastify.wsapix.close()
        })
    })

    fastify.listen(0, (err) => {
        t.error(err)

        const client = new WebSocket(
            'ws://localhost:' + fastify.server.address().port
        )

        client.on('open', () => {
            client.onmessage = (msg) => {
                t.equal(msg.data, '"hello client"')
            }
        })
    })
})
