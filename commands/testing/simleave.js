module.exports = {
  name: 'simleave',
  description: 'Simulates a leave.',
  usage: ' ',
  permissions: 'ADMINISTRATOR',
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    client.emit('guildMemberLeave', message.member);
  },
};
