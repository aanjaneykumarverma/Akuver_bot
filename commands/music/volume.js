module.exports = {
  name: 'volume',
  description: 'Set the volume!',
  usage: ' [1-100]',
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

    if (!args[0] || isNaN(args[0]) || args[0] === 'Infinity')
      return channel.send(`Please enter a valid number (between 1 and 100)!`);

    if (
      Math.round(parseInt(args[0])) < 1 ||
      Math.round(parseInt(args[0])) > 100
    )
      return channel.send(`Please enter a valid number (between 1 and 100)!`);

    const success = client.player.setVolume(message, parseInt(args[0]));

    if (success) channel.send(`Volume set to **${parseInt(args[0])}%** !`);
  },
};
