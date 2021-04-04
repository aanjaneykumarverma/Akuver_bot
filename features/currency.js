const mongo = require('../util/mongo.js');
const profileSchema = require('../schemas/profile-schema.js');

const coinsCache = {};

module.exports = (client) => {};

module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) =>{
    try{
      await profileSchema.findOneAndUpdate({
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
      }).then((result)=>{
        coinsCache[`${guildId}-${userId}`] = result.coins;
        return result.coins;
      }).then(()=>mongoose.connection.close());
    } catch(err){
      console.log(err);
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
      }).then(async ()=>{
        let coins = 0;
        if(result){
          coins = result.coins;
        } else{
          await new profileSchema({
            guildId: guildId,
            userId: userId,
            coins: coins,
          }).save();
        }
        coinsCache[`${guildId}-${userId}`] = coins;
        return coins;
      }).then(()=>mongoose.connection.close());
    } catch (err){
      console.log(err);
    }
  });
};

module.exports.sort = async(guildId,max) => {
  return await mongo().then(async (mongoose)=>{
    try{
        await profileSchema.find()
       .sort({'coins':'desc'})
       .limit(max).then((response)=>{
         return response;
       }).then(()=>mongoose.connection.close());
   }catch(err){
      console.log(err);
    }
  });
};
