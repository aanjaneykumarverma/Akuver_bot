const roleclaim = require('../role_claim.js');
const mongo = require('../mongo.js');
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
      roleclaim(client);
    }
};
