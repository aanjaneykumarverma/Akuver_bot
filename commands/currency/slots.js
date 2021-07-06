const { MessageEmbed } = require('discord.js');
const currency = require('../../features/currency');

const slotItems = ['🍇', '🍉', '🍊', '🍎', '💰', '🍓', '🍒 '];

module.exports = {
  name: 'slots',
  description: 'Play Slots!',
  usage: ' <Amount>',
  guildOnly: true,
  async execute(message, args) {
    const user = message.author;
    let win = false;
    let numbers = [];
    let multiplier = 0;
    let amount = args[0];
    if (!amount) return message.reply('Please specify an amount to gamble.');
    const currentAmount = await currency.getCoins(message.guild.id, user.id);
    if (amount > currentAmount)
      return message.reply('You are not capable of betting that much!');
    for (i = 0; i < 3; i++) {
      numbers[i] = Math.floor(Math.random() * slotItems.length);
    }
    numbers = numbers.sort();
    if (numbers[0] == numbers[2]) {
      multiplier = 9;
      win = true;
    } else if (numbers[0] == numbers[1] || numbers[1] == numbers[2]) {
      multiplier = 2;
      win = true;
    }
    amount *= multiplier - 1;
    await currency.addCoins(message.guild.id, user.id, -amount);
    const text = win
      ? 'Congratulations!! You won!'
      : 'You lost! Better luck next time';
    const description = win
      ? `You won ${amount} coins`
      : `You lost ${-amount} coins`;

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(text)
      .setDescription(
        `${slotItems[numbers[0]]} | ${slotItems[numbers[1]]} | ${
          slotItems[numbers[2]]
        }`
      )
      .addFields(
        { name: 'Description', value: description },
        { name: '\u200B', value: '\u200B' },
        { name: 'multiplier', value: `${multiplier}x` }
      )
      .setTimestamp()
      .setFooter('by Dark Casino Royale');
    message.channel.send(embed);
  },
};
