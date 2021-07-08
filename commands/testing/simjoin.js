module.exports = {
  name: 'simjoin',
  description: 'Simulates a join.',
  usage: ' ',
  category: 'Testing',
  permissions: 'ADMINISTRATOR',
  guildOnly: true,
  execute(message, args) {
    const client = message.client;
    client.emit('guildMemberAdd', message.member);
  },
};
