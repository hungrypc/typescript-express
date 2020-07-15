import 'reflect-metadata'

const plane = {
  color: 'red'
}

Reflect.defineMetadata('note', 'hi there', plane)
// this is like adding a 'note' property of 'hi there' to the plane object,
// except this property is never going to show up in any debugger or anything
// its essentially an invisible property.

console.log(plane)
// { color: 'red' }

const note = Reflect.getMetadata('note', plane)

console.log(note)
// 'hi there'

// we can even do this:
Reflect.defineMetadata('note', 'hihi', plane, 'color')
// this is adding { note: 'hihi' } to the color property of plane

const note2 = Reflect.getMetadata('note', plane, 'color')

console.log(note2)
// 'hihi'

///////////////////////////////////// practical use-case /////////////////////////////////////

// simple
class Plane {
  color: string = 'red'

  @markFunction
  fly(): void {
    console.log('vrrr')
  }
}

function markFunction(target: Plane, key: string) {
  Reflect.defineMetadata('secret', 123, target, key)
}

const secret = Reflect.getMetadata('secret', Plane.prototype, 'fly')

console.log(secret)
// 123



// factory decorator use
class Plane2 {
  color: string = 'red'

  @markFunction2('hi there')
  fly(): void {
    console.log('vrrr')
  }
}

function markFunction2(secretInfo: string) {
  return function(target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key)
  }
}

const secret2 = Reflect.getMetadata('secret', Plane2.prototype, 'fly')

console.log(secret2)
// 'hi there'



// better way to retrieve rather than reaching into prototype of class
@printMetadata
class Plane3 {
  color: string = 'red'

  @markFunction3('hi there')
  fly(): void {
    console.log('vrrr')
  }
}

function markFunction3(secretInfo: string) {
  return function(target: Plane, key: string) {
    Reflect.defineMetadata('secret', secretInfo, target, key)
  }
}

function printMetadata(target: typeof Plane3) {
  // this will loop through all keys of prototype (eg fly)
  for (let key in target.prototype) {
    // then pass as key the property we're getting metadata off of
    const secret = Reflect.getMetadata('secret', target.prototype, key)
    // looking for metadata 'secret'
    console.log(secret)
  }
}

// 'hi there'