const mongo = require('../util/mongo.js');
const fs = require('fs');
const featuresFiles = fs.readdirSync('./features').filter(file => file.endsWith('.js'));
module.exports={
    name: 'ready',
    once: true,
    async execute(client){
      console.log("I'm ready now!");
      await mongo().then(mongoose => {
        try{
          console.log('Connected to mongo!');
        } finally{
          mongoose.connection.close();
        }
      });
      for(const file of featuresFiles){
        const feature = require(`../features/${file}`);
        if(file==='scheduled.js') {
          await feature(client);
        } else{
          feature(client);
        }
      }
    }
};
