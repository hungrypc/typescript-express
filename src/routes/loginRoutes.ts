import { Router, Request, Response } from 'express'

interface RequestWithBody extends Request {
  body: { [key: string]: string | undefined }
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

router.post('/login', (req: RequestWithBody, res: Response) => {
  const { email, password } = req.body

  if (email && password) {
    req.session = { loggedIn: true }
    res.redirect('/')
  } else {
    res.send('Must provide valid details')
  }
})

export {
  router
}