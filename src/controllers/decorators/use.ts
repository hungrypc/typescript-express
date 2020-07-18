import 'reflect-metadata'
import { MetadataKeys } from './MetadataKeys'
import { RequestHandler } from 'express'

export function use(middleware: RequestHandler) {
  return function(target: any, key: string, desc: PropertyDescriptor) {
    // we want the ability to call this thing multiple times
    const middlewares = Reflect.getMetadata(MetadataKeys.middleware, target, key) || []

    middlewares.push(middleware)

    Reflect.defineMetadata(MetadataKeys.middleware, middlewares, target, key)
  }
}