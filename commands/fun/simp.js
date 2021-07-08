module.exports = {
  name: 'simp',
  description: 'Gives the simprate of the user!',
  usage: ' @user',
  category: 'Fun',
  guildOnly: true,
  execute(message, args) {
    const target = message.mentions.users.first();
    if (!target) {
      return message.reply('Please mention a user!');
    }
    const simprate = Math.floor(Math.random() * 101);
    message.channel.send(`<@${target.id}> is ${simprate} % Simp!!`);
  },
};
