const currency = require('../../features/currency');

module.exports = {
  name: 'bal',
  description: 'Returns the balance of the user.',
  usage: ' @member(optional)',
  category: 'Currency',
  cooldown: 5,
  guildOnly: true,
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author;
    const targetId = target.id;
    const guildId = message.guild.id;
    const userId = target.id;
    const coins = await currency.getCoins(guildId, userId);
    const text = message.mentions.users.first()
      ? `${target.username} has ${coins} coins!`
      : `You have ${coins} coins!`;
    message.reply(text);
  },
};
