const currency = require('../../features/currency.js');

module.exports = {
  name: 'bal',
  description: 'Returns the balance of the user.',
  usage: ' @member(optional)',
  cooldown: 5,
  guildOnly: true,
  async execute(message, args) {
    const target = message.mentions.users.first() || message.author;
    const targetId = target.id;
    const guildId = message.guild.id;
    const userId = target.id;
    try {
      const coins = await currency.getCoins(guildId, userId);
      message.reply(`That user has ${coins} coins!`);
    } catch (err) {
      console.log(err.message);
      throw err;
    }
  },
};
