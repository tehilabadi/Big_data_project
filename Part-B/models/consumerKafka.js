// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");
const axios = require('axios');



// use you own parameters
const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "dory-01.srvs.cloudkafka.com:9094,dory-02.srvs.cloudkafka.com:9094,dory-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "0o2s7ydw",
  "sasl.password": "2SAAzNrd5iCOdBlKIicPoypaJT_XrRJG",
  "debug": "generic,broker,security"
};

const prefix = "0o2s7ydw-";
const topic = `${prefix}default`;


const topics = [topic];
const consumer = new Kafka.KafkaConsumer(kafkaConf, {
  "auto.offset.reset": "beginning"
});

consumer.on("error", (err) => {
  console.log("1");
    console.error(err);
  });
  
  consumer.on("ready", function(arg) {
    console.log(`Consumer ${arg.name} ready - for Redis & Dashboard`);
    consumer.subscribe(topics);
    consumer.consume();
  });
  consumer.on("data", function(m) {
    console.log("wow");
  });
  
  consumer.on("disconnected", (arg)=> {
    console.log("2");
    process.exit();
  });
  consumer.on('event.error', (err)=> {
    console.error(err);
    process.exit(1);
  });
  consumer.on('event.log', function(log) {
    // console.log("3");
    // console.log(log);
  });
  consumer.connect();

  module.exports.consumer = consumer;
