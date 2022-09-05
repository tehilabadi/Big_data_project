const express = require('express');
const app = express();
var server = require('http').createServer(app)
const kafka = require('./models/consumerKafka');
const controllerRouter = require('./routes/controller'); //controller
const redis = require("./models/redis");

const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});

var bodyParser = require('body-parser')
app.set('view engine', 'ejs');
app.use(express.static('./views'));
app.use(express.json());


io.on("connection", async (socket) => {
    console.log("io connect");
    


    socket.on('resetDB', function () {
        // reset redis
        redis.initDB(); 
    });

});
    kafka.consumer.on("data", async (msg) => {
        let flight = JSON.parse(msg.value);
        io.emit("new_flight", {location1: flight.lo, location2: flight.lo2, location3: flight.degree , direction :flight.direction});


        //         flight.lo = word.location1;
        //         flight.lo2 = word.location2;
        //         flight.degree=word.location3;
        //         flight.scheduleddeparture = word.scheduleddeparture;
        //         flight.lscheduledarrival = word.scheduledarrival;
        //         flight.realdeparture=word.realdeparture;
        //         flight.realarrival=word.realarrival;
        //         flight.estimateddeparture=word.estimateddeparture;
        //         flight.estimatedarrival=word.estimatedarrival;
        //         flight.id = word.TZ;
        console.log("kaafka info");
        // console.log(flight.lo);
    });

    //Get data from redis to dashboard
    // let allDataArray = await redis.getAllData();
    // // console.log(allDataArray+ " serverB");
    // // console.log(typeof allDataArray);
    // io.emit('allData', 
    // {location1: allDataArray[0],location2: allDataArray[1], location3: allDataArray[2]});
    // socket.on('resetDB', function () {
    //     // reset redis
    //     redis.initDB(); 
    // });




// ------------Consumer from Kafka-----------------
// kafka.consumer.on("data", async (msg) => {
//     const flight = JSON.parse(msg.value);
//     console.log("waiting...");
//     redis.setTopic('location1',msg.value);
//     io.emit("new_flight", {location1: flight.location1, location2: flight.location2, location3: flight.location3});
//     // redis.setTopic(newCall.topic,0);
//     let allDataArray = await redis.getAllData();
//     //Send to front with socket
//     console.log("before emit");
//     io.emit('allData', {location1: allDataArray[0],location2:allDataArray[1],location3:allDataArray[2]});
//     console.log("server published");
// });


//----------------Front Side  ------------------

app.use('/', controllerRouter);

//------------------------------------------------

const Port = process.env.PORT || 3001;
//http://localhost:3001
server.listen(Port, () => console.log(`Server B is listening at http://localhost:${Port}`));
