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
    //Get data from redis to dashboard
    let allDataArray = await redis.getAllData();
    
    io.emit('allData', 
    {location1: allDataArray[0],location2: allDataArray[1], location3: allDataArray[2]});

    socket.on('resetDB', function () {
        // reset redis
        redis.initDB(); 
    });

});


// ------------Consumer from Kafka-----------------
kafka.consumer.on("data", async (msg) => {
    const newCall = JSON.parse(msg.value);

    // **Store the data in Redis and after send to Dashboard */
     

        io.emit("new flight",
        {firstname: newCall.firstName, lastname: newCall.lastName, phone: newCall.phone
            , topic: newCall.topic, totaltime: newCall.totalTime});

        redis.setTopic(newCall.topic,0);
    

    //Get data from redis to dashboard
    let allDataArray = await redis.getAllData();
    
    //Send to front with socket
    io.emit('allData', {join: allDataArray[0]});
});


//----------------Front Side - Daily Call Center ------------------

app.use('/', controllerRouter);

//------------------------------------------------

const Port = process.env.PORT || 3001;
//http://localhost:3001
server.listen(Port, () => console.log(`Server B is listening at http://localhost:${Port}`));
