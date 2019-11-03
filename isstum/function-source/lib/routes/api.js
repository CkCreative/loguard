"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const functions = require("firebase-functions");
const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
admin.initializeApp(functions.config().firebase);
const database = admin.database();
function writeUserData(name, email, phone) {
    admin.database().ref('bookings/').set({
        name: name,
        email: email,
        phone: phone
    });
}
router.post('/bookings', function (req, res) {
    console.log(req.body);
    writeUserData(req.body.name, req.body.email, req.body.phone);
    res.send(req.body);
});
module.exports = router;
//# sourceMappingURL=api.js.map