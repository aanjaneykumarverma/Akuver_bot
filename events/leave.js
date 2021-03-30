module.exports = {
  name: 'guildMemberLeave',
  execute(member,client){
    const channelId = '826455840705609738'; //leave-logs
    const msg = `<@${member.user.id}> has left the server.`;
    const channel = member.guild.channels.cache.get(channelId);
    channel.send(msg);
  },
};
