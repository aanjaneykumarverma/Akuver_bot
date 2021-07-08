module.exports = {
  name: 'channelEmpty',
  execute(message, queue) {
    message.channel.send(
      'Music stopped as there are no members in the voice channel!'
    );
  },
};
