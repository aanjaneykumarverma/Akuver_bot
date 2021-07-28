const { prefix } = require('../config');
const { loadData } = require('../util/update');

module.exports = {
  name: 'guildCreate',
  async execute(guild, client) {
    const data = [];
    data.push(
      `Hello, I'm Akuver Bot! Thanks for inviting me.\nPlease send ${prefix}help to get a list of my commands.\n`
    );
    data.push(
      'To ensure smooth functioning, please set up the following details for your server:\n'
    );
    data.push(`Prefix: Use setprefix command for this.(Default:${prefix})\n`);
    data.push('Welcome channel: Use setwelcome command for this.\n');
    data.push('Leave channel: Use setleave command for this.\n');
    data.push('Rules & Info channel: Use setrule command for this.\n');
    data.push('Role Claim channel: Use setrole command for this.\n');
    data.push('Polls channel: Use setpoll command for this.\n');
    data.push('Tickets channel: Use setticket command for this.\n');
    data.push('Levels channel: Use setlevel command for this.\n');
    data.push(
      'Please note that setting up these details is completely optional.\nHowever, certain features might not work if the corresponding details are missing.\n'
    );
    guild.owner.send(data, { code: true });
    await loadData(client);
  },
};
