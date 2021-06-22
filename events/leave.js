const { leave } = require('../util/update');

module.exports = {
  name: 'guildMemberLeave',
  execute(member, client) {
    const guildId = member.guild.id;
    if (typeof leave[guildId.toString()] === 'undefined') return;
    const channelId = leave[guildId.toString()];
    const msg = `<@${member.user.id}> has left the server.`;
    const channel = member.guild.channels.cache.get(channelId);
    channel.send(msg);
  },
};
