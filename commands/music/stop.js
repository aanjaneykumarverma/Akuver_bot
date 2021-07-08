module.exports = {
  name: 'stop',
  description: 'Stop all music!',
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
    client.player.setRepeatMode(message, false);
    const stop = client.player.stop(message);
    if (stop) channel.send('Music stopped successfully!');
  },
};
