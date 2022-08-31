const express = require('express');
const router = express.Router();
var db = require('../models/MySql');
var kaf = require('../models/produceKafka');

router.get('/', (req, res) => { //(URL || Path , Call back function)
    // Call Generator of users from MySQL
   db.query("SELECT * FROM details;", function (err, result, fields) {
        if (err) throw err;
        result1 = JSON.stringify(result);
        console.log("controller");
        kaf.publish(result1);
        // res.send('produceKafka' ,{data: result1});
        res.render('dashboard' ,{data: result1});
   
    });
    
})

module.exports = router;