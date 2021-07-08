const { prefix: globalPrefix } = require('../../config.json');
const { prefix } = require('../../util/update');
const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'filters',
  description: 'Get a list of all filters!',
  usage: ' ',
  category: 'Music',
  guildOnly: true,
  execute(message, args) {
    const { client, channel, guild } = message;
    if (!message.member.voice.channel)
      return channel.send(`You're not in a voice channel!`);

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return channel.send(`You are not in the same voice channel!`);

    if (!client.player.getQueue(message))
      return channel.send(`No music currently playing!`);

    const filtersStatuses = [[], []];

    client.filters.forEach((filterName) => {
      const array =
        filtersStatuses[0].length > filtersStatuses[1].length
          ? filtersStatuses[1]
          : filtersStatuses[0];
      array.push(
        filterName.charAt(0).toUpperCase() +
          filterName.slice(1) +
          ' : ' +
          (client.player.getQueue(message).filters[filterName] ? 'on' : 'off')
      );
    });
    let prefix_guild = globalPrefix;
    prefix_guild = prefix[guild.id.toString()]
      ? prefix[guild.id.toString()]
      : globalPrefix;
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setDescription(
        `List of all filters enabled or disabled.\nUse \`${prefix_guild}filter\` to add a filter to a song.`
      )
      .addFields(
        { name: 'Filters', value: filtersStatuses[0].join('\n'), inline: true },
        { name: '** **', value: filtersStatuses[1].join('\n'), inline: true }
      )
      .setTimestamp();
    channel.send(embed);
  },
};
