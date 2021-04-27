module.exports = {
  name: 'slow',
  description: 'Changes the slowmode duration for this channel.',
  usage: ' duration reason ',
  permissions: 'ADMINISTRATOR',
  guildOnly: true,
  execute(message, args) {
    const { channel } = message;
    if (args.length < 2) {
      message.reply('Please provide a duration and a reason.');
      return;
    }
    let duration = args.shift().toLowerCase();
    if (duration === 'off') {
      duration = 0;
    }

    if (isNaN(duration)) {
      message.reply('Please provide either number of seconds or "off".');
      return;
    }
    channel.setRateLimitPerUser(duration, args.join(' '));
    message.reply(
      `The slowmode for this channel has been set to ${duration}s.`
    );
  },
};
