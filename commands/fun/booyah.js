module.exports = {
  name: 'booyah',
  description: 'Booyah!', // optional
  usage: ' ',
  category: 'Fun',
  execute(message, args) {
    message.channel.send('Tight Tight!');
  },
};
