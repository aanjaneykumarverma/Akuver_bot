module.exports = {
  name: 'botDisconnect',
  execute(message, queue) {
    message.channel.send('Music stopped as I disconnected from the channel!');
  },
};
