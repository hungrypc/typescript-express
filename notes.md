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

## Issues with Type Definition Files
**CONS**:
- Type definition files alone can't express what is going on in the JS world accurately (eg middleware)
- Type definition files provided to us aren't always accurate
- Inputs to a server (or any program with external inputs) are not guarenteed to exist, or be of the correct type

**PROS**:
- Addressing these type issues with TS can *force* us to write better code


