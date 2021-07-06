const { MessageEmbed } = require('discord.js');
const inventorySchema = require('../../schemas/inventory-schema');
const factory = require('../../util/factory');
module.exports = {
  name: 'profile',
  description: 'Displays the inventory of the user.',
  usage: ' @member[optional]',
  guildOnly: true,
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author;
    const targetId = target.id;
    const guildId = message.guild.id;
    const userId = target.id;
    const profile = await factory.getOne(inventorySchema, { guildId, userId });
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setAuthor(`${target.username}'s Inventory`, target.displayAvatarURL())
      .addFields(
        { name: 'VIP Pass', value: `${profile.vip}` },
        { name: 'Cars', value: `${profile.car}` },
        { name: 'Mansions', value: `${profile.mansion}` },
        { name: 'JetSkis', value: `${profile.jetski}` }
      )
      .setTimestamp();
    message.channel.send(embed);
  },
};
