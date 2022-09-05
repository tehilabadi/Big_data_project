const mysql = require('mysql2');
const axios = require('axios');
const { response } = require('express');
const express = require('express');
const { _makeLong } = require('path');
const router = express.Router();

var connection = mysql.createConnection({
  //Properties
  host: 'localhost',
  user: 'root',
  password: 'QqWwEe6559@',
  database: 'flights'
});
var url = 'http://data-live.flightradar24.com/clickhandler/?version=1.5&flight=';

const flight = (words) => {
    
        let id = Math.floor(Math.random() * 1000000000);
        let location1 = words[1];
        let location2 = words[2];
        let location3 = words[3];
        let dir;
        if(words[11]==="\"TLV\""){
          dir = 1;
        }
        else{
          dir = 0;
        }
        let fly = {id,location1,location2,location3,dir};

    return fly;
}


function add(){
var data = null;
// Insert details about flights to DB (Table - users)
connection.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");

    axios.get(
        "https://data-cloud.flightradar24.com/zones/fcgi/feed.js?faa=1&bounds=41.449%2C21.623%2C16.457%2C53.063&satellite=1&mlat=1&flarm=1&adsb=1&gnd=1&air=1&vehicles=1&estimated=1&maxage=14400&gliders=1&stats=1")
      .then(async function (response) {
        data = response.data;
      })
      .catch(async function (error) {
          console.log("error")
      })
      .then(async function () {

         count = 1;
          connection.query("DELETE FROM details;" )
          for (var key of Object.keys(data)) {
            let temp = key;
            const myJSON = JSON.stringify(data[key]);
            const words = myJSON.split(',');
            if(words[11]==="\"TLV\""||words[12]==="\"TLV\""){
              axios.get(url+key)
              .then(async function (response) {
                mongoData = response.data;
                let fly = flight(words);
                var sql = `INSERT INTO details (id, location1,location2,location3, scheduleddeparture, scheduledarrival,realdeparture,realarrival,estimateddeparture,estimatedarrival,landing,TZ) 
              VALUES (${fly.id},'${fly.location1}','${fly.location2}','${fly.location3}','${mongoData.time.scheduled.departure}','${mongoData.time.scheduled.arrival}','${mongoData.time.real.departure}','${mongoData.time.real.arrival}','${mongoData.time.estimated.departure}','${mongoData.time.estimated.arrival}','${fly.dir}','${temp}');`;
              connection.query(sql, function (err, result) {
              if (err) throw err;
        });


                // console.log(key);
              })
              .catch(async function (error) {
                  // console.log("error"+ " "+error+" "+(typeof key));
                  
              })
              .then(async function () {
                // console.log("data from mongo");
              });
              
              // console.log("sql vibes");


              count++;
            }
              
              
    
      }   
     }); 

    
    
  });
}

// setInterval(add,10000);
add();

    module.exports = connection;

