module.exports = {
  name: 'resume',
  description: 'Resume music!',
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
    if (!client.player.getQueue(message).paused)
      return channel.send('Music is already playing!');

    const resume = client.player.resume(message);
    if (resume)
      channel.send(
        `Song ${client.player.getQueue(message).playing.title} resumed!`
      );
  },
};
