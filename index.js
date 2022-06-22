'use strict'

const fp = require('fastify-plugin')
const wsx = require('wsapix')

const closeHook = 'onClose'
const engineWs = 'ws'
const engineUWS = 'uWS'

function wsapixPlugin(fastify, settings, next) {
    const opts = {
        engine: '',
    }

    if (typeof settings.engine === 'string' && settings.engine === engineUWS) {
        opts.engine = engineUWS
    } else {
        opts.engine = engineWs
    }

    const wsapix =
        opts.engine === engineWs
            ? wsx.Wsapix.WS({ server: fastify.server, path: '/' })
            : wsx.Wsapix.uWS({ server: fastify.server })

    if (!fastify.hasDecorator('rateLimit')) {
        fastify.decorate('wsapix', wsapix)
    }

    fastify.addHook(closeHook, (fastify, done) => fastify.wsapix.close(done))

    next()
}

module.exports = fp(wsapixPlugin, {
    fastify: '4.x',
    name: 'fastify-wsapix',
})
