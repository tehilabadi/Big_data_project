var fs = require('fs')
var express = require('express');
var app = express();
var server = require('http').createServer(app);
// const contact = require('./script'); //controller
const io = require("socket.io")(server, {
    allowEIO3: true // false by default
});
const kafka = require('./produceKafka');
const controllerRouter = require('./controller'); //controller


var bodyParser = require('body-parser')

app.set('view engine', 'ejs');
app.use(express.static('client'));
// app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/', controllerRouter);

io.on("connection", (socket) => {
    console.log("new user connected");
    socket.on("totalWaitingCalls", (msg) => { kafka.publish(msg) });
    socket.on("callDetails", (msg) => { kafka.publish(msg) });
});

// app.get('/', function(req, res) {
//     // script.code(res);
//     fs.createReadStream("./dashboard.ejs").pipe(res);
// });


const Port = process.env.PORT | 3000;
//http://localhost:3000
server.listen(Port, () => console.log(`Call Generator app listening at http://localhost:${Port}`));

