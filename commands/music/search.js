module.exports = {
  name: 'search',
  description: 'Open a panel to choose a music and then play it',
  usage: ' [name/URL]',
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
    if (!args[0]) return channel.send('Please mention a song to search!');
    client.player.play(message, args.join(' '));
  },
};
