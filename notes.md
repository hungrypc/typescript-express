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

## A Closer Integration
So for now, we've tried to use express as normally as we could and just added in the absolute bare minimum number of type annotations. So we were only making use of typescript to get some really basic checking and error catching inside of our app. We didn't do any special customization or anything like that. Next, we're going to try to figure out how we can really twist express and ts together to make them work together way more closely than they currently are. 

Whenever we make use of ts, the main features of the language is classes and interfaces. How do we get express to work with classes? It's a spectrum. 

On the easy end, we can essentially take all of our express code and refactor it all to live inside of a class. 
```ts
// for example:
class Server {
  app: express.Express = express()

  constructor() {
    this.app.use(bodyParser.urlencoded({ extended: true }))
    this.app.use(cookieSession({ keys: ['someKey'] }))
    this.app.use(router)
  }

  start(): void {
    this.app.listen(3000, () => {
      console.log('listening on port 3000')
    })
  }
}

new Server().start
```

But, did we gain anything here? Is this code objectively easier to understand? No. Is it easier to write? Probably not. So when talking about moving express code into a class, there's not really much of an immediate benefit. If you're going to go through this entire process of refactoring to work with ts using some class based approach, there has got to be a good outcome. You have to justify that effort, otherwise you're wasting time. 

There's really got to be one or two possible outcomes of doing an integration. 
1. Get better type safety (help ts do a better job of catching errors)
2. Significantly enhace the developer experience

On the other side of the spectrum, we could take our express code, throw it into classes, and then on top of that we could figure out some way to make use of some advanced features in ts. This is exactly what we're going to do. 

Although we're throwing them into classes, we're using some ts features to enhance the dev experience. In other words, we want to figure out some way to use ts to make it way easier to write express code than what we've put together so far. 

## The Basics of Metadata
[experiment file](https://github.com/hungrypc/typescript-express/blob/master/src/experiments/metadata.ts)

Metadata is like some secret info that doesn't really show up anywhere except through the use of 'reflect-metadata'. The info that we associate with this object is going to be a little object of its own. 