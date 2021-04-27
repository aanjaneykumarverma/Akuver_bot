const { tictactoe } = require('reconlx');

module.exports = {
  name: 'ttt',
  description: 'Play tic tac toe with the mentioned user!',
  usage: ' @user',
  guildOnly: true,
  async execute(message, args) {
    const user = message.mentions.members.first();
    if (!user) {
      return message.reply('Please mention a user to play with!');
    }
    new tictactoe({
      player_two: user,
      message: message,
    });
  },
};
