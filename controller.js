const express = require('express');
const router = express.Router();
var db = require('./Mysql');


router.get('/', (req, res) => { //(URL || Path , Call back function)
    // Call Generator of users from MySQL
   db.query("SELECT * FROM details;", function (err, result, fields) {
       if (err) throw err;
        // res.render('./dashboard' ,{data: result})
res.send("hello world");
    });
})

module.exports = router;