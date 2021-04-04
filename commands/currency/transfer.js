const currency = require('../../features/currency.js');

module.exports = {
  name: 'transfer',
  description: 'Transfers currency to mentioned user',
  usage: '[currency MEMBER]',
  cooldown: 10,
  guildOnly: true,
  async execute(message,args){
    const currentAmount = currency.getCoins(message.guild.id, message.author.id);
    const {transferAmount, transferTarget} = args;
    if(!transferAmount || isNaN(transferAmount)) {
      return message.channel.send(`Sorry ${message.author}, that's an invalid amount.`);
    }
    if(!transferTarget){
      return message.channel.send(`${message.author}, please mention a user to transfer the amount to.`);
    }
    if (transferAmount > currentAmount) {
      return message.channel.send(`Sorry ${message.author}, you only have ${currentAmount}.`);
    }
    if (transferAmount <= 0) {
      return message.channel.send(`Please enter an amount greater than zero, ${message.author}.`);
    }
    currency.addCoins(message.guild.id, message.author.id, -transferAmount);
    currency.addCoins(message.guild.id, transferTarget.id, transferAmount);
    return message.channel.send(`Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}.`);
  },
};
