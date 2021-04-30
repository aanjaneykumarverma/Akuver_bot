const { leave } = require('../util/update.js');

module.exports = {
  name: 'guildMemberLeave',
  execute(member, client) {
    const guildId = member.guild.id;
    if (typeof leave[guildId.toString()] === 'undefined') return;
    const channelId = leave[guildId.toString()].substring(
      2,
      leave[guildId].length - 1
    );
    const msg = `<@${member.user.id}> has left the server.`;
    const channel = member.guild.channels.cache.get(channelId);
    channel.send(msg);
  },
};
