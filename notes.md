# Notes

## Basic Routes with Express (& TS)
```ts
import express from 'express'

const app = express()

app.get('/', (req, res) => {
})
```
We can optionally add into this function type annotations. It's not strictly required, and comes down to how deep with ts you want to go.

If you cmd+click `express`, it will open a file that tells us all the different types that express exports.
```ts
import express, { Request, Response } from 'express'

const app = express()

app.get('/', (req: Request, res: Response) => {
  res.send(`
    <div>
      <h1>Hey there</h1>
    </div>
  `)
})
```