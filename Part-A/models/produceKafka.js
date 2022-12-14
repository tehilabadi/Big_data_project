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

const prefix2 = "0o2s7ydw-";
const topic2 = `${prefix2}new`;


const producer = new Kafka.Producer(kafkaConf);

const genMessage = m => new Buffer.alloc(m.length,m);

producer.on("ready", function(arg) {
  console.log(`producer ${arg.name} ready.`); 
});
producer.connect();
module.exports.publish = function(msg)
{   
  
  m=JSON.stringify(msg);
  producer.produce(topic, -1, genMessage(m), uuid.v4());   
  // producer.produce(topic2, -1, genMessage(m), uuid.v4());  
}
producer.on("error", (err) => {
  console.log("error producer");
    console.error(err);
  });

