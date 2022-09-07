const express = require('express');
const app = express();
var server = require('http').createServer(app)
const kafka = require('./models/consumerKafka');
const controllerRouter = require('./routes/controller'); //controller
const redis = require("./models/redis");

const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});

var bodyParser = require('body-parser');
const { Console } = require('console');
app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.use(express.json());


io.on("connection", async (socket) => {
    console.log("io connect"); 
    socket.on('resetDB', function () {
        // reset redis
        redis.initDB(); 
    });
    io.emit("newConnection");
});
    kafka.consumer.on("data", async (msg) => {

        let flight = JSON.parse(msg.value);
        // console.log(flight);
        // console.log(flight.TZ);
        if(String(msg.value).includes("description")){
            io.emit("weather",{temp:flight.temp,main:flight.main,description:flight.description,icon:flight.icon});
            console.log("weather print serverB");
        }
        else{
            redis.setTopic("flight",msg.value);
            let allDataArray = await redis.getAllData();
            // io.emit("hel", {data: JSON.parse(allDataArray[0])});
            // console.log(allDataArray[0]);
            io.emit("new_flight", {data: JSON.parse(allDataArray[0])});

            // io.emit("new_flight", {location1: flight.lo, location2: flight.lo2, location3: flight.degree , direction :flight.direction, TZ:flight.id, arrivel:flight.estimatedarrival,src : flight.src , dest : flight.dest});
        }
       
    });

//----------------Front Side  ------------------

app.use('/', controllerRouter);

//------------------------------------------------

const Port = process.env.PORT || 3001;
//http://localhost:3001
server.listen(Port, () => console.log(`Server B is listening at http://localhost:${Port}`));
