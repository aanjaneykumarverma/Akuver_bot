const currency = require('../../features/currency');

module.exports = {
  name: 'transfer',
  description: 'Transfers currency to mentioned user',
  usage: ' currency @member',
  cooldown: 10,
  guildOnly: true,
  async execute(message, args) {
    const currentAmount = await currency.getCoins(
      message.guild.id,
      message.author.id
    );
    const transferAmount = args[0];
    const transferTarget = message.mentions.users.first();
    if (!transferAmount || isNaN(transferAmount)) {
      return message.channel.send(
        `Sorry ${message.author}, that's an invalid amount.`
      );
    }
    if (!transferTarget) {
      return message.channel.send(
        `${message.author}, please mention a user to transfer the amount to.`
      );
    }
    if (transferAmount > currentAmount) {
      return message.channel.send(
        `Sorry ${message.author}, you only have ${currentAmount}.`
      );
    }
    if (transferAmount <= 0) {
      return message.channel.send(
        `Please enter an amount greater than zero, ${message.author}.`
      );
    }
    await currency.addCoins(
      message.guild.id,
      message.author.id,
      -transferAmount
    );
    await currency.addCoins(
      message.guild.id,
      transferTarget.id,
      transferAmount
    );
    return message.channel.send(
      `Successfully transferred ${transferAmount}💰 to ${transferTarget.tag}.`
    );
  },
};
