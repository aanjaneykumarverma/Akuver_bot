const currency = require('../../features/currency.js');

module.exports = {
  name: 'leaderboard',
  description: 'Displays the leaderboard (Top x)',
  usage: '[x(max 10) optional]',
  cooldown: 10,
  guildOnly: true,
  async execute(message, args) {
    const { client } = message;
    let top = args[0];
    if (isNaN(top)) top = 10;
    const list = [];
    await currency.sort(message.guild.id, top).then((data) => {
      let rank = 1;
      for (const index in data) {
        const user = data[index];
        list.push(
          `${rank} ${client.users.cache.get(user.userId).tag} ${user.coins}💰`
        );
        rank++;
      }
    });
    return message.channel.send(list, { code: true });
  },
};
