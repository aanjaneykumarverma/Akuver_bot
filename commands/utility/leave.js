const { clearData } = require('../../util/update');

module.exports = {
  name: 'leave',
  description: 'Leaves the server!',
  usage: ' ',
  permissions: 'ADMINISTRATOR',
  guildOnly: true,
  execute(message, args) {
    message.channel.send('Leaving the server! Bye!');
    clearData(message.guild.id);
    message.guild
      .leave()
      .then((g) => console.log(`Left the guild ${g}`))
      .catch(console.error);
  },
};
