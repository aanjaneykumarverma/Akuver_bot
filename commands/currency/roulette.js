const { MessageEmbed } = require('discord.js');
const currency = require('../../features/currency');
module.exports = {
  name: 'roulette',
  description: 'Play roulette!',
  usage: ' <Colour> <Amount>',
  guildOnly: true,
  async execute(message, args) {
    const user = message.author;
    let multiplier;
    let [colour, amount] = args;
    const random = Math.floor(Math.random() * 111);
    if (!colour)
      return message.reply(
        'Please select a colour. Red [2x] Green [4x] Blue [15x]'
      );

    if (!amount) return message.reply('Please specify an amount to gamble.');
    const currentAmount = await currency.getCoins(message.guild.id, user.id);
    if (amount > currentAmount)
      return message.reply('You are not capable of betting that much!');

    colour = colour.toLowerCase();
    if (colour.startsWith('r')) {
      colour = 0;
      multiplier = 2;
    } else if (colour.startsWith('g')) {
      colour = 1;
      multiplier = 4;
    } else if (colour.startsWith('b')) {
      colour = 2;
      multiplier = 15;
    }
    if (((colour % 2) + (random % 2)) % 2 === 0) {
      amount *= multiplier - 1;
      await currency.addCoins(message.guild.id, user.id, amount);
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Congratulations!! You won!')
        .addFields(
          { name: 'Description', value: `You won ${amount} coins` },
          { name: '\u200B', value: '\u200B' }, // blank field
          { name: 'multiplier', value: `${multiplier}x` }
        )
        .setTimestamp()
        .setFooter('by Dark Casino Royale');
      message.channel.send(embed);
    } else {
      await currency.addCoins(message.guild.id, user.id, -amount);
      const embed = new MessageEmbed()
        .setColor('#0099ff')
        .setTitle('You lost! Better luck next time')
        .addFields(
          { name: 'Description', value: `You lost ${amount} coins` },
          { name: '\u200B', value: '\u200B' }, // blank field
          { name: 'multiplier', value: '0x' }
        )
        .setTimestamp()
        .setFooter('by Dark Casino Royale');
      message.channel.send(embed);
    }
  },
};
