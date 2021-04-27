const currency = require('../../features/currency.js');

module.exports = {
  name: 'bal',
  description: 'Returns the balance of the user.',
  usage: ' @member(optional)',
  cooldown: 5,
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author;
    const targetId = target.id;
    const guildId = message.guild.id;
    const userId = target.id;
    const coins = await currency.getCoins(guildId, userId);
    message.reply(`That user has ${coins} coins!`);
  },
};
