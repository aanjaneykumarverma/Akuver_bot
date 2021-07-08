module.exports = {
  name: 'shuffle',
  description: 'Shuffle the queue',
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
      return channel.send(`No music currently playing!`);

    const shuffle = client.player.shuffle(message);

    if (shuffle)
      channel.send(
        `Queue shuffled **${
          client.player.getQueue(message).tracks.length
        }** song(s) !`
      );
  },
};
