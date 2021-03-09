const firstMsg = require('./first_msg.js');

module.exports = (client) => {
  const channelId = '815477746310184962';
  const botId = '815474132182368256';
  const getEmoji = (emojiName) => client.emojis.cache.find((emoji) => emoji.name === emojiName);

  const emojis = {
    'like': 'Like',
    'dislike': 'Dislike',
  }

  const reactions = [];
  let emojiText = 'Add a reaction to claim a role\n';
  for (const key in emojis){
    const emoji = getEmoji(key);
    reactions.push(emoji);
    const role = emojis[key];
    emojiText += `${emoji} = ${role}\n`;
  }

  firstMsg(client, channelId, emojiText, reactions);

  const handleReaction = (reaction, user, select) => {
    if(user.id === botId) return;

    const emoji = reaction._emoji.name;
    const {guild} = reaction.message;
    const roleName = emojis[emoji];

    if(!roleName) return;

    const role = guild.roles.cache.find((role) => role.name === roleName);
    const member = guild.members.cache.find((member) => member.id === user.id);

    if(select){
      member.roles.add(role);
    } else{
      member.roles.remove(role);
    }
  }
  client.on('messageReactionAdd', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, true)
    }
  })

  client.on('messageReactionRemove', (reaction, user) => {
    if (reaction.message.channel.id === channelId) {
      handleReaction(reaction, user, false)
    }
  })
}
