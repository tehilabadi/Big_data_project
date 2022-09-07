       
       
       
    const express = require('express');
    const router = express.Router();
    module.exports = router;
    // var kafcon = require('../models/consumerKafka');

    router.get('/', (req,res) => { //(URL || Path , Call back function)
        



        res.render('./dashboard');
    });
    
    // where style files will be
  
    router.use('/', express.static('./views/dashboard'))

   