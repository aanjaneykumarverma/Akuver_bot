const firstMsg = require('../util/first_msg.js');
const { role } = require('../util/update.js');
module.exports = (client) => {
  const botId = '815474132182368256';
  const channels = client.guilds.cache.map((guild) => role[guild.id]);
  const emojis = {
    '🔒': 'Verified',
  };

  const reactions = [];
  let emojiText = 'Add a reaction to claim a role\n';
  for (const emoji in emojis) {
    reactions.push(emoji);
    const role = emojis[emoji];
    emojiText += `${emoji} = ${role}\n`;
  }
  for (const channelId of channels) {
    if (typeof channelId === 'undefined') {
      continue;
    }
    firstMsg(client, channelId, emojiText, reactions);

    const handleReaction = (reaction, user, select) => {
      if (user.id === botId) return;

      const emoji = reaction._emoji.name;
      const { guild } = reaction.message;
      const roleName = emojis[emoji];

      if (!roleName) return;

      const role = guild.roles.cache.find((role) => role.name === roleName);
      const member = guild.members.cache.find(
        (member) => member.id === user.id
      );

      if (select) {
        member.roles.add(role);
      } else {
        member.roles.remove(role);
      }
    };
    client.on('messageReactionAdd', (reaction, user) => {
      if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, true);
      }
    });

    client.on('messageReactionRemove', (reaction, user) => {
      if (reaction.message.channel.id === channelId) {
        handleReaction(reaction, user, false);
      }
    });
  }
};
