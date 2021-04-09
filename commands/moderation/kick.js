module.exports = {
  name: 'kick',
  description: 'Kicks the specified user from the server.',
  usage: '[@user_id]',
  permissions: 'ADMINISTRATOR, KICK_MEMBERS',
  guildOnly: true,
  execute(message,args){
      const {member, mentions} = message;
      const tag = `<@${member.id}>`;
      const target = mentions.users.first();
      if(target){
        const targetMember = message.guild.members.cache.get(target.id);
        targetMember.kick();
        message.channel.send(`${tag} That user has been kicked.`);
      } else{
        message.channel.send(`${tag} Please specify someone to kick.`);
      }
  },
};
