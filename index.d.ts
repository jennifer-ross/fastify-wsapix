/// <reference types='node' />
import { FastifyPluginCallback } from 'fastify'
import { Wsapix } from 'wsapix'
import {
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerBase,
    RawServerDefault,
} from 'fastify/types/utils'
import { FastifyLoggerInstance } from 'fastify/types/logger'
import {
    FastifyTypeProvider,
    FastifyTypeProviderDefault,
} from 'fastify/types/type-provider'

declare module 'fastify' {
    interface FastifyInstance<
        RawServer extends RawServerBase = RawServerDefault,
        RawRequest extends RawRequestDefaultExpression<RawServer> = RawRequestDefaultExpression<RawServer>,
        RawReply extends RawReplyDefaultExpression<RawServer> = RawReplyDefaultExpression<RawServer>,
        Logger extends FastifyLoggerInstance = FastifyLoggerInstance,
        TypeProvider extends FastifyTypeProvider = FastifyTypeProviderDefault
    > {
        wsapix: Wsapix
    }
}

export type WsapixHook = 'onClose'

export interface WsapixOptions {
    hook?: WsapixHook
}

export interface WsapixPluginOptions extends WsapixOptions {
    engine?: 'ws' | 'uWs'
}

declare const wsapixPlugin: FastifyPluginCallback<WsapixPluginOptions>
export default wsapixPlugin
