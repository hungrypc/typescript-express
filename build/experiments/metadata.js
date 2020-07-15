"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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
///////////////////////////////////// practical use-case /////////////////////////////////////
// simple
var Plane = /** @class */ (function () {
    function Plane() {
        this.color = 'red';
    }
    Plane.prototype.fly = function () {
        console.log('vrrr');
    };
    __decorate([
        markFunction,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Plane.prototype, "fly", null);
    return Plane;
}());
function markFunction(target, key) {
    Reflect.defineMetadata('secret', 123, target, key);
}
var secret = Reflect.getMetadata('secret', Plane.prototype, 'fly');
console.log(secret);
// 123
// factory decorator use
var Plane2 = /** @class */ (function () {
    function Plane2() {
        this.color = 'red';
    }
    Plane2.prototype.fly = function () {
        console.log('vrrr');
    };
    __decorate([
        markFunction2('hi there'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Plane2.prototype, "fly", null);
    return Plane2;
}());
function markFunction2(secretInfo) {
    return function (target, key) {
        Reflect.defineMetadata('secret', secretInfo, target, key);
    };
}
var secret2 = Reflect.getMetadata('secret', Plane2.prototype, 'fly');
console.log(secret2);
// 'hi there'
// better way to retrieve rather than reaching into prototype of class
var Plane3 = /** @class */ (function () {
    function Plane3() {
        this.color = 'red';
    }
    Plane3.prototype.fly = function () {
        console.log('vrrr');
    };
    __decorate([
        markFunction3('hi there'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Plane3.prototype, "fly", null);
    Plane3 = __decorate([
        printMetadata
    ], Plane3);
    return Plane3;
}());
function markFunction3(secretInfo) {
    return function (target, key) {
        Reflect.defineMetadata('secret', secretInfo, target, key);
    };
}
function printMetadata(target) {
    // this will loop through all keys of prototype (eg fly)
    for (var key in target.prototype) {
        // then pass as key the property we're getting metadata off of
        var secret_1 = Reflect.getMetadata('secret', target.prototype, key);
        // looking for metadata 'secret'
        console.log(secret_1);
    }
}
// 'hi there'
