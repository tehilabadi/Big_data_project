const db = require('./redisConnection');

const keys = ["location1","location2","location3"];

const todayEnd = new Date().setHours(23, 59, 59, 999);

const redisDB = {

    //Delete all keys in end of the day
    setExpiresTime: function () {
        keys.forEach(element => {
            if(db.exists(element)){
                // sets an expiration date for the data 
                db.expireat(element, parseInt(todayEnd / 1000));
            }
        });
        console.log('set an expiration date!'); 
    },

    //Init all keys
    initDB: async function() {
        keys.forEach(key => {
            db.set(key, 0);
        });
        console.log('initDB');
    },

    //Increase valus of specific key
    incrementByOne: async function(key){
        
        try {
            // check if the key exists
            const exists = await db.exists(key);

            if(!exists) {
               // init the key and increaments
               await db.set(key, 1);  
            //    console.log(`updated ${key} number: ` + 1);
            
            }

            else { //exists
                // gets the data
                let value = await db.get(key);
        
                // increments and stores the updated data in the database
                await db.set(key, ++value);
                // console.log(`updated ${key} number: ${value}`);
            }
        
        } catch (error) {
            console.log(error);
        }
    },

    //Set number of waiting calls
    setWaiting: async function(key, value){
        try {
            // stores the data in the database
            await db.set(key, value);
            // console.log(`updated ${key} number: ${value}`);
        
        } catch (error) {
            console.log(error);
        }
    },

    //Increase number of specific topic / Set number of waiting calls
    setTopic: async function(topic, value) {
        // we can refactor this
        switch(topic) {
            case 'location1':
                await this.setWaiting('location1', value);
                break;
            case 'location2':
                await this.setWaiting('location2', value);
                break;
            case 'location3':
                await this.setWaiting('location3', value);
                break;
            default:
                console.log('invalid topic');
                break;
            }
            
    },
    
    

    getAllData: async function() {
        let allData = [];

        //Topic + waiting
        allData.push(await db.get('location1'));
        
        //Cities
        // console.log("Get all data from Redis!");
        // console.log(allData);

        return allData;
    },
    
}

module.exports = redisDB;