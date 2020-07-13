"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
var express_1 = require("express");
var router = express_1.Router();
exports.router = router;
router.get('/login', function (req, res) {
    res.send("\n    <form method='POST'>\n      <div>\n        <label>Email</label>\n        <input name='email' type='email' autocomplete='off' />\n      </div>\n      <div>\n        <label>Password</label>\n        <input name='password' type='password' />\n      </div>\n      <button>Submit</button>\n    </form>\n  ");
});
router.post('/login', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (email && password) {
        req.session = { loggedIn: true };
        res.redirect('/');
    }
    else {
        res.send('Must provide valid details');
    }
});
router.get('/', function (req, res) {
    // look at session to check if logged in
    if (req.session && req.session.loggedIn) {
        res.send("\n      <div>\n        <div>You are logged in</div>\n        <a href=\"/logout\">Logout</a>\n      </div>\n    ");
    }
    else {
        res.send("\n      <div>\n        <div>You are not logged in</div>\n        <a href=\"/login\">Login</a>\n      </div>\n    ");
    }
});
