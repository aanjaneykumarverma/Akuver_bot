module.exports = {
  name: 'searchCancel',
  execute(message, query, tracks) {
    message.channel.send(
      `You did not provide a valid response ... Please send the command again!`
    );
  },
};
