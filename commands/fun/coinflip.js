module.exports = {
  name: 'coinflip',
  description: 'Flips a coin!',
  usage: ' ',
  category: 'Fun',
  execute(message, args) {
    const n = Math.floor(Math.random() * 2);
    let result;
    if (n === 1) result = 'Heads';
    else result = 'Tails';
    message.reply(`You got ${result}!`);
  },
};
