const roleclaim = require('../features/role_claim.js');
const rules = require('../features/rules_and_info.js');
const mongo = require('../util/mongo.js');
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
      rules(client);
    }
};
