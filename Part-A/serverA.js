var express = require('express');
var app = express();
var server = require('http').createServer(app);
var kafpro = require('./models/produceKafka');
const controllerRouter = require('./routes/controller'); //controller
const axios = require('axios');


const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});

var bodyParser = require('body-parser');
const { json } = require('express');

app.set('view engine', 'ejs');
app.use(express.static('./views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', controllerRouter);

app.get('/', function(req, res) {
    console.log("new user connected");
    
});
io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("currentFlights", (msg) => { kafpro.publish(msg) });
    socket.on("MachineLearning", (msg) => { kafpro.publish(msg) });
    axios.get("https://api.openweathermap.org/data/2.5/weather?lat=32.109333&lon=34.855499&units=metric&appid=517ebcff77e5c5604d4f5ad45946264d")
      .then(async function (response) {
        data = response.data;
        
        console.log("hi");
        for (var key of Object.keys(data)) {
            if(key==="weather"){
            const myJSON = JSON.stringify(data[key]);
            const words = myJSON.split(',');
            // console.log(words);
            const main = words[1].split(':');
            console.log(main[1]);
            const description = words[2].split(':');
            console.log(description[1]);
            const icon = words[3].split(':');
            console.log(icon[1]);
            icon[1] = icon[1].substring(1,4);
            console.log(icon[1]);
            let weather = {};
            weather.temp = data.main.temp;
            weather.main = main[1];
            weather.description = description[1];
            weather.icon = icon[1];
            kafpro.publish(weather);
            }
        }
        // console.log(data.weather);
        // console.log(JSON.stringify(data.weather));
        // console.log(typeof data.weather);
        // console.log(data);
        // let weather = {};

        // weather.temp = data.main.temp;
        // var t= JSON.stringify(data.weather);
        // weather.icon = t;
        // kafpro.publish(weather);
      })
      .catch(async function (error) {
          console.log("error from serverA" + error)
      })
      .then(async function () {
      });
});


const Port = process.env.PORT | 3000;
//http://localhost:3000
server.listen(Port, () => console.log(`Call Generator app listening at http://localhost:${Port}`));

