module.exports = {
  name: 'simleave',
  description: 'Simulates a leave.',
  usage: ' ',
  permissions: 'ADMINISTRATOR',
  execute(message,args){
    const client = message.client;
    client.emit('guildMemberLeave', message.member);
  },
};
