import express from 'express'
import bodyParser from 'body-parser'
// import { router } from './routes/loginRoutes'
import cookieSession from 'cookie-session'

import { AppRouter } from './AppRouter'
import './controllers/LoginController'
import './controllers/RootController'

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieSession({ keys: ['someKey'] }))
// app.use(router)
app.use(AppRouter.getInstance())

app.listen(3000, () => {
  console.log('listening on port 3000')
})