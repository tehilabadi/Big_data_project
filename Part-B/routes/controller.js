       
       
       
    const express = require('express');
    const router = express.Router();
    module.exports = router;
    // var kafcon = require('../models/consumerKafka');

    router.get('/', (req,res) => { //(URL || Path , Call back function)
        res.render('./dashboard');
    });
    
    // where style files will be
    router.use('/', express.static('./views/dashboard'))

    // router.get('/', (req,res) => { //(URL || Path , Call back function)
    //     // res.render('dashboard');
    //     kafcon.consumer.on("data", async (msg) => {
    //         console.log(msg.value);
    //         res.render('dashboard' ,{data: JSON.parse(msg.value)});
    //         console.log("controller again");
    //     });
    // });
    
    // where style files will be
    // router.use('/', express.static('./views/dashboard'))
