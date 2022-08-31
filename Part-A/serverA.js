var express = require('express');
var app = express();
const axios = require('axios');
var server = require('http').createServer(app);
const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});
// const kafka = require('./models/produceKafka');
const sql = require('./models/Mysql');

const controllerRouter = require('./routes/controller'); //controller
var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static('./views'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', controllerRouter);

app.get('/', function(req, res) {
    
});
// io.on("connection", (socket) => {
//     console.log("new user connected");
//     socket.on("totalWaitingCalls", (msg) => { kafka.publish(msg) });
//     socket.on("callDetails", (msg) => { kafka.publish(msg) });
// });


const Port = process.env.PORT | 3000;
//http://localhost:3000
server.listen(Port, () => console.log(`Call Generator app listening at http://localhost:${Port}`));

