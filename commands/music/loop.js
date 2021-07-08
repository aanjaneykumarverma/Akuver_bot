module.exports = {
  name: 'loop',
  description: 'Enable/Disable repeat of current song/queue!',
  usage: ' [queue/song]',
  category: 'Music',
  guildOnly: true,
  execute(message, args) {
    const { client, channel } = message;
    if (!message.member.voice.channel)
      return channel.send(`You're not in a voice channel!`);

    if (
      message.guild.me.voice.channel &&
      message.member.voice.channel.id !== message.guild.me.voice.channel.id
    )
      return channel.send(`You are not in the same voice channel!`);

    if (!client.player.getQueue(message))
      return channel.send(`No music currently playing!`);

    if (args.join(' ').toLowerCase() === 'queue') {
      if (client.player.getQueue(message).loopMode) {
        client.player.setLoopMode(message, false);
        return channel.send(`Repeat mode **disabled**!`);
      } else {
        client.player.setLoopMode(message, true);
        return channel.send(
          `Repeat mode **enabled** the whole queue will be repeated endlessly!`
        );
      }
    } else {
      if (client.player.getQueue(message).repeatMode) {
        client.player.setRepeatMode(message, false);
        return channel.send(`Repeat mode **disabled**!`);
      } else {
        client.player.setRepeatMode(message, true);
        return channel.send(
          `Repeat mode **enabled** the current music will be repeated endlessly!`
        );
      }
    }
  },
};
