const { MessageEmbed } = require('discord.js');
const currency = require('../../features/currency');
const valid = ['red', 'green', 'blue'];
module.exports = {
  name: 'roulette',
  description: 'Play roulette!',
  usage: ' <Colour> <Amount>',
  category: 'Currency',
  guildOnly: true,
  async execute(message, args) {
    const user = message.author;
    let multiplier = 0;
    let win = false;
    let [colour, amount] = args;
    const random = Math.floor(Math.random() * 111);
    if (!colour)
      return message.reply(
        'Please select a colour. Red [4x] Green [8x] Blue [15x]'
      );
    colour = colour.toLowerCase();
    if (!valid.includes(colour))
      return message.reply('Please select a valid colour.(Red, Green, Blue)');
    if (!amount) return message.reply('Please specify an amount to gamble.');
    const currentAmount = await currency.getCoins(message.guild.id, user.id);
    if (amount > currentAmount)
      return message.reply('You are not capable of betting that much!');

    if (colour.startsWith('r')) {
      colour = 0;
      multiplier = 4;
    } else if (colour.startsWith('g')) {
      colour = 1;
      multiplier = 8;
    } else if (colour.startsWith('b')) {
      colour = 2;
      multiplier = 15;
    }
    amount *= multiplier - 1;
    await currency.addCoins(message.guild.id, user.id, amount);

    if (((colour % 2) + (random % 2)) % 2 === 0) {
      win = true;
    }
    const text = win
      ? 'Congratulations!! You won!'
      : 'You lost! Better luck next time';
    const description = win
      ? `You won ${amount} coins`
      : `You lost ${-amount} coins`;

    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(text)
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
