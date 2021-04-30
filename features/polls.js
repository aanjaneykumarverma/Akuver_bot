const { polls } = require('../util/update.js');
const channels = ['826698915763060807', '825706248783003648']; //polls, testing
module.exports = (client) => {
  client.on('message', (message) => {
    const { channel, content } = message;
    const guildId = message.guild.id;
    if (typeof polls[guildId] === 'undefined') return;
    if (channel.id !== polls[guildId].substring(2, polls[guildId].length - 1)) {
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
