// https://www.cloudkarafka.com/ הפעלת קפקא במסגרת ספק זה

const uuid = require("uuid");
const Kafka = require("node-rdkafka");

// use you own parameters
const kafkaConf = {
  "group.id": "cloudkarafka-example",
  "metadata.broker.list": "tricycle-01.srvs.cloudkafka.com:9094,tricycle-02.srvs.cloudkafka.com:9094,tricycle-03.srvs.cloudkafka.com:9094".split(","),
  "socket.keepalive.enable": true,
  "security.protocol": "SASL_SSL",
  "sasl.mechanisms": "SCRAM-SHA-256",
  "sasl.username": "8iba851e",
  "sasl.password": "X7vN63uXq6SgNl-VVxJuYkvwEXGtEPbA",
  "debug": "generic,broker,security"
};

const prefix = "8iba851e-";
const topic = `${prefix}new`;

const prefix2 = "8iba851e-";
const topic2 = `${prefix2}default`;


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
  producer.produce(topic2, -1, genMessage(m), uuid.v4());  
}