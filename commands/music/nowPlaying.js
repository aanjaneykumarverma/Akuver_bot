const { MessageEmbed } = require('discord.js');
module.exports = {
  name: 'nowplaying',
  description: 'See music in progress',
  usage: ' ',
  category: 'Music',
  guildOnly: true,
  cooldown: 5,
  execute(message, args) {
    const { client, channel } = message;
    if (!message.member.voice.channel)
      return channel.send("You're not in a voice channel!");
    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return channel.send("You're not in the same voice channel!");
    if (!client.player.getQueue(message))
      return channel.send('No music currently playing!');
    const track = client.player.nowPlaying(message);
    const filters = [];

    Object.keys(client.player.getQueue(message).filters).forEach(
      (filterName) => client.player.getQueue(message).filters[filterName]
    )
      ? filters.push(filterName)
      : false;
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setAuthor(track.title)
      .addFields(
        { name: 'Channel', value: track.author, inline: true },
        {
          name: 'Requested by',
          value: track.requestedBy.username,
          inline: true,
        },
        {
          name: 'From playlist',
          value: track.fromPlaylist ? 'Yes' : 'No',
          inline: true,
        },
        { name: 'Views', value: track.views, inline: true },
        { name: 'Duration', value: track.duration, inline: true },
        {
          name: 'Filters activated',
          value: filters.length + '/' + client.filters.length,
          inline: true,
        },

        {
          name: 'Volume',
          value: client.player.getQueue(message).volume,
          inline: true,
        },
        {
          name: 'Repeat mode',
          value: client.player.getQueue(message).repeatMode ? 'Yes' : 'No',
          inline: true,
        },
        {
          name: 'Currently paused',
          value: client.player.getQueue(message).paused ? 'Yes' : 'No',
          inline: true,
        },

        {
          name: 'Progress bar',
          value: client.player.createProgressBar(message, {
            timecodes: true,
          }),
          inline: true,
        }
      )
      .setTimestamp()
      .setThumbnail(track.thumbnail);

    channel.send(embed);
  },
};
