import { Router, Request, Response, NextFunction } from 'express'

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
}

function requireAuth(req: Request, res: Response, next: NextFunction): void {
  if (req.session && req.session.loggedIn) {
    next()
    return
  } 

  res.status(403)
  res.send('Not permitted')
}

const router = Router()

router.get('/login', (req: Request, res: Response) => {
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
})

router.post('/login', (req: RequestWithBody, res: Response): void => {
  const { email, password } = req.body

  if (email && password) {
    req.session = { loggedIn: true }
    res.redirect('/')
  } else {
    res.send('Must provide valid details')
  }
})

router.get('/', (req: Request, res: Response): void => {
  // look at session to check if logged in
  if (req.session && req.session.loggedIn) {
    res.send(`
      <div>
        <div>You are logged in</div>
        <a href="/logout">Logout</a>
      </div>
    `)
  } else {
    res.send(`
      <div>
        <div>You are not logged in</div>
        <a href="/login">Login</a>
      </div>
    `)
  }
})

router.get('/logout', (req: Request, res: Response): void => {
  req.session = null
  res.redirect('/')
})

router.get('/protected', requireAuth, (req: Request, res: Response): void => {
  res.send('Welcome to protected route, logged in user')
})

export {
  router
}