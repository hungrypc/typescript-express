"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var plane = {
    color: 'red'
};
Reflect.defineMetadata('note', 'hi there', plane);
// this is like adding a 'note' property of 'hi there' to the plane object,
// except this property is never going to show up in any debugger or anything
// its essentially an invisible property.
console.log(plane);
// { color: 'red' }
var note = Reflect.getMetadata('note', plane);
console.log(note);
// 'hi there'
// we can even do this:
Reflect.defineMetadata('note', 'hihi', plane, 'color');
// this is adding { note: 'hihi' } to the color property of plane
var note2 = Reflect.getMetadata('note', plane, 'color');
console.log(note2);
// 'hihi'
