module.exports = {
  name: 'queueEnd',
  execute(message, queue) {
    message.channel.send(
      `Music stopped as there is no music left in the queue!`
    );
  },
};
