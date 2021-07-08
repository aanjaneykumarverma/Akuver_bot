module.exports = {
  name: 'clearqueue',
  description: 'Clears the music queue!',
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

    if (client.player.getQueue(message).tracks.length <= 1)
      return channel.send('There is only one song in the queue!');

    client.player.clearQueue(message);
    channel.send('The queue has been cleared!');
  },
};
