const roleclaim = require('../role_claim.js');

module.exports={
    name: 'ready',
    once: true,
    execute(client){
      console.log("I'm ready now!");
      roleclaim(client);
    }
};
