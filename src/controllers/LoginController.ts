import { Request, Response } from 'express'
import { get, controller, validateBody, post } from './decorators'

@controller('/auth')
class LoginController {
  @get('/login')
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

  @post('/login')
  @validateBody('email', 'password')
  postLogin(req: Request, res: Response): void {
    const { email, password } = req.body
  
    if (email && password) {
      req.session = { loggedIn: true }
      res.redirect('/')
    } else {
      res.send('Must provide valid details')
    }
  }

  @get('/logout')
  getLogout(req: Request, res: Response): void {
    req.session = null
    res.redirect('/')
  }
}