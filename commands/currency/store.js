const { Vip, Car, Mansion, JetSki } = require('../../config.json');

module.exports = {
  name: 'store',
  description: 'Lists the items in store!',
  usage: ' ',
  guildOnly: true,
  execute(message, args) {
    let text = [];
    text.push('Here are the items available in the store!');
    text.push(`VIP Rank : ${Vip} coins. [buy VIP]`);
    text.push(`Car : ${Car} coins. [buy Car]`);
    text.push(`Mansion : ${Mansion} coins. [buy Mansion]`);
    text.push(`JetSki : ${JetSki} coins. [buy JetSki]`);
    text.join('\n');
    message.channel.send(text, { code: true });
  },
};
