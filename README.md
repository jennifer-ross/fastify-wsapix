# fastify-wsapix

[![npm version](https://badge.fury.io/js/fastify-wsapix.svg)](https://badge.fury.io/js/fastify-wsapix)

WebSocket support for [Fastify](https://github.com/fastify/fastify) built on the [wsapix](https://github.com/udamir/wsapix.git) library.

## Install

```shell
npm install fastify-wsapix --save
```
Support TypeScript

## Usage

```js
import Fastify from 'fastify'
import fastifyWsapix from 'fastify-wsapix'

const app = Fastify({
    log: true,
})

app.register(fastifyWsapix, {
    engine: 'ws' // can be only 'ws' or 'uWS', default is 'ws'
})

app.listen(3000, err => {
    if (err) {
        app.log.error(err)
        process.exit(1)
    }
})

app.wsapix.on('connect', (client) => {
    console.log('Client connected.')
    client.send('Hellow from server!') // Creates an echo server
})
```

## Notes

[Wsapix](https://github.com/udamir/wsapix.git) it is next generation Websocket framework for nodejs

Provides to you:
- Channel/message approach for websocket API
- uWebsockets.js engine support
- Middlewares and hooks support
- Custom schema parser/serializer support
- Message paylaod validation
- AsyncAPI specification generation
- Mock server with websocket client injection
- Typescript syntax support out of the box

## License

Licensed under [MIT](./LICENSE).