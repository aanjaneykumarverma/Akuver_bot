const scheduledSchema = require('../schemas/scheduled-schema.js');
const mongo = require('../util/mongo.js');
module.exports.async = true;
module.exports = async (client) => {
  const checkForPosts = async () => {
    const query = {
      date: {
        $lte: Date.now(),
      },
    }
    await mongo().then(async (mongoose)=>{
      try{
        const results = await scheduledSchema.find(query);
        for(const post of results){
          const {guildId, channelId, content} = post;
          const guild = await client.guilds.fetch(guildId);
          if(!guild){
            continue;
          }
          const channel = guild.channels.cache.get(channelId);
          if(!channel){
            continue;
          }
          channel.send(content);
        }
      }catch(err){
        console.log(err);
      }finally{
        mongoose.connection.close();
      }
    });
    await mongo().then(async (mongoose)=>{
      try{
        const results = await scheduledSchema.deleteMany(query);
      }finally{
        mongoose.connection.close();
      }
    });
    setTimeout(checkForPosts, 1000*10);
  };
  await checkForPosts();
};
