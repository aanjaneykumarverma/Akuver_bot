const { poll } = require('../util/update');

module.exports = (client) => {
  client.on('message', (message) => {
    const { channel, content } = message;
    if (!message || !message.guild) return;
    const guildId = message.guild.id;
    if (typeof poll[guildId.toString()] === 'undefined') return;
    if (channel.id !== poll[guildId.toString()]) {
      return;
    }
    const eachLine = content.split('\n');

    for (const line of eachLine) {
      if (line.includes('=')) {
        const split = line.split('=');
        const emoji = split[0].trim();
        message.react(emoji);
      }
    }
  });
};
