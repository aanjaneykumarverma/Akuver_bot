const momentTimezone = require('moment-timezone');
const {MessageCollector} = require('discord.js');
const scheduledSchema = require('../../schemas/scheduled-schema.js');
const mongo = require('../../util/mongo.js');
module.exports = {
  name: 'schedule',
  description: 'Schedules a message.',
  usage: '<Channel tag> <YYYY/MM/DD> <HH:MM> <"AM" or "PM"> <Timezone>',
  permissions: 'ADMINISTRATOR',
  guildOnly: true,
  async: true,
  async execute(message, args){
    const {mentions, guild, channel } = message;
    const targetChannel = mentions.channels.first();
    if(!targetChannel){
      message.reply('Please tag a channel to send your message in.');
      return;
    }
    args.shift();
    const [date, time, clockType, timeZone] = args;
    if(clockType !== 'AM' && clockType !== 'PM'){
      message.reply(`You must provide either "AM" or "PM", you provided "${clockType}"`);
      return;
    }
    const validTimeZones = momentTimezone.tz.names();
    if(!validTimeZones.includes(timeZone)){
      message.reply('Unknown timezone! Please choose a valid one from <https://github.com/Akuver/Akuver_bot/blob/main/util/timezones.txt>');
      return;
    }
    const targetDate = momentTimezone.tz(
      `${date}${time}${clockType}`,
      'YYYY-MM-DD HH:mm A',
      timeZone
    );
    message.reply('Please send the message you would like to schedule.');
    const filter = (newMessage) => {
      return newMessage.author.id === message.author.id;
    }
    const collector = new MessageCollector(channel, filter, {
      max: 1,
      time: 1000*60,
    })
    collector.on('end', async(collected)=>{
      const collectedMessage = collected.first();
      if(!collectedMessage){
        message.reply('You did not reply in time.');
        return;
      }
      await mongo().then(async (mongoose)=>{
        try{
          console.log('Inserting a scheduled msg.');
          await scheduledSchema.insertOne({
            date: targetDate.format(),
            content: collectedMessage.content,
            guildId: guild.id,
            channelId: targetChannel.id,
          });
        } catch(err){
          console.log(err,"ERROR");
        }finally{
            console.log('Done');
            mongoose.connection.close();
        }
      });
      message.reply('Your message has been scheduled.');
    });
  },
};
