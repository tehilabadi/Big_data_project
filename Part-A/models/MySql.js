const mysql = require('mysql2');
// const {faker} = require("@faker-js/faker");
const axios = require('axios');
const { response } = require('express');
const express = require('express');
const router = express.Router();

var connection = mysql.createConnection({
  //Properties
  host: 'localhost',
  user: 'root',
  password: 'QqWwEe6559@',
  database: 'flights'
});


const flight = (words) => {
    
        let id = Math.floor(Math.random() * 1000000000);
        let location1 = words[1];
        let location2 = words[2];
        let location3 = words[3];
        let fly = {id,location1,location2,location3};

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
            const myJSON = JSON.stringify(data[key]); 
            const words = myJSON.split(',');
            if(words[11]==="\"TLV\""||words[12]==="\"TLV\""){
              let fly = flight(words);

              count++;
              
              var sql = `INSERT INTO details (id, location1,location2,location3) 
              VALUES (${fly.id},'${fly.location1}','${fly.location2}','${fly.location3}');`;
              connection.query(sql, function (err, result) {
              if (err) throw err;
        });
    }
      }   
     }); 

    
    
  });
}

setInterval(add,30000);
  

    module.exports = connection;

