import { Request, Response, NextFunction } from 'express'
import { get, controller, use } from './decorators'

function logger(req: Request, res: Response, next: NextFunction) {
  console.log('request was made')
  next()
}

@controller('/auth')
class LoginController {
  @get('/login')
  @use(logger)
  getLogin(req: Request, res: Response): void {
    res.send(`
      <form method='POST'>
        <div>
          <label>Email</label>
          <input name='email' type='email' autocomplete='off' />
        </div>
        <div>
          <label>Password</label>
          <input name='password' type='password' />
        </div>
        <button>Submit</button>
      </form>
    `)
  }
}