const Discord = require('discord.js');
const amongUsCategorySchema = require('../../schemas/among-us-category-schema.js');
const channelNameStart = 'Among Us';
module.exports = {
  name: 'au',
  description: 'Makes it easier to play among us with friends.',
  usage: '[<Region> <Code>]',
  guildOnly: true,
  async execute(message, args) {
    const [region, code] = args;
    if (!region || !code) {
      message.reply('Please provide region and code.');
      return;
    }
    const { channel, guild, member } = message;
    const categoryDocument = await amongUsCategorySchema.findOne({
      _id: guild.id,
    });
    if (!categoryDocument) {
      message.reply(
        'An Among Us category has not been set within this server.'
      );
      return;
    }
    const channelName = `${channelNameStart} ${code}`;
    await guild.channels.create(channelName, {
      type: 'voice',
      userLimit: 10,
      parent: categoryDocument.categoryId,
    });
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setAuthor(
        member.nickname || member.displayName,
        member.user.displayAvatarURL()
      )
      .setDescription(
        `${member} created a new Among Us game! Join channel "${channelName}"`
      )
      .addField('Region', region)
      .addField('Game code', code);

    channel.send(embed);
  },
};
