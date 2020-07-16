import express from 'express'

// singleton
export class AppRouter {
  private static instance: express.Router

  static getInstance(): express.Router {
    if (!AppRouter.instance) {
      AppRouter.instance = express.Router()
    }

    return AppRouter.instance
  }
}

// idea is that we want to only ever have one single router avaiable inside of the app\
// if we ever want to access that router, we're going to import AppRouter and then use
// getInstance()