var express = require('express');
var app = express();
var server = require('http').createServer(app);
var kafpro = require('./models/produceKafka');
const controllerRouter = require('./routes/controller'); //controller
const axios = require('axios');


const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});

var bodyParser = require('body-parser')

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
    // axios.get("https://openweathermap.org/city/293396")
    //   .then(async function (response) {
    //     data = response.data;
    //     console.log(data);
    //     io.emit("wether",{data:data});
    //   })
    //   .catch(async function (error) {
    //       console.log("error from serverA")
    //   })
    //   .then(async function () {
    //   });
});


const Port = process.env.PORT | 3000;
//http://localhost:3000
server.listen(Port, () => console.log(`Call Generator app listening at http://localhost:${Port}`));

