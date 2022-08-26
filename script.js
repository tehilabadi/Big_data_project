const axios = require('axios');
const { response } = require('express');
const express = require('express');
const router = express.Router();
// var app = express()

    axios.get(
        "https://data-cloud.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds=41.449%2C21.623%2C16.457%2C53.063&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1")
      .then(async function (response) {
        data = response.data;
        
      })
      .catch(async function (error) {
          console.log("1")
      })
      .then(async function () {
          console.log(typeof 'data');
          const dat = JSON.parse(JSON.stringify(data))
          // console.log(typeof 'dat');
          var length = dat.full_count;
          console.log(dat.full_count);
          console.log(Object.keys(dat)[0]);
          console.log(Object.keys(data)[1]);
          console.log(Object.keys(data)[2]);
          console.log(Object.keys(data)[3]);
          for (var key of Object.keys(data)) {
            const myJSON = JSON.stringify(data[key]); 
            const words = myJSON.split(',');
          } 
        
     });

module.exports = router ;


