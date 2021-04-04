const mongo = require('../util/mongo.js');
const profileSchema = require('../schemas/profile-schema.js');

const coinsCache = {};

module.exports = (client) => {};

module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) =>{
    try{
      const result = await profileSchema.findOneAndUpdate({
        guildId,
        userId,
      },{
        guildId,
        userId,
        $inc:{
          coins,
        },
      },{
        upsert: true,
        new: true,
      });
      coinsCache[`${guildId}-${userId}`] = result.coins;
      return result.coins;
    } finally{
      mongoose.connection.close();
    }
  });
};

module.exports.getCoins = async(guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`];
  if(cachedValue){
    return cachedValue;
  }
  return await mongo().then(async (mongoose)=>{
    try{
      const result = await profileSchema.findOne({
        guildId,
        userId,
      });
      return result.coins;
    } finally{
      mongoose.connection.close();
    }
  });
};

module.exports.sort = async(guildId,max) => {
  return await mongo().then(async (mongoose)=>{
    try{
      const all = await profileSchema.find()
       .sort({'coins':'desc'})
       .limit(max);
       return all;
   }
    finally{
      mongoose.connection.close();
    }
  });
};
