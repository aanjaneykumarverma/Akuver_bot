const firstMsg = require('../util/first_msg');
const { prefix: globalPrefix } = require('../config.json');
const { rules, role, prefix } = require('../util/update');
module.exports = (client) => {
  const run = () => {
    const botId = '815474132182368256';
    const guilds = client.guilds.cache.map((guild) => guild.id);
    for (const guild of guilds) {
      if (!role[guild] || !rules[guild]) continue;
      let prefix_guild = prefix[guild] ? prefix[guild] : globalPrefix;
      let text = [];
      text.push('Welcome to the server!');
      text.push('**Rules:**');
      text.push('1. No spamming, advertising, or illegal activity.');
      text.push('2. No hateful or inappropriate messages.');
      text.push(
        '3. No excessive cursing or cursing towards another member in a disrespectful way.'
      );
      text.push(
        '4. Use the appropriate channels for your topic when possible.'
      );
      text.push(
        '5. Do not ping people out of nowhere unless you have a good reason.'
      );
      text.push(`**Verify yourself and claim roles in <#${role[guild]}>**`);
      text.push(`**Send ${prefix_guild}help to get the list of commands. **`);
      text.push(
        `**Always use ${globalPrefix} before your commands while DMing the bot & not your server prefix. **`
      );
      text.join('\n');
      firstMsg(client, rules[guild], text);
    }
    setTimeout(run, 1000 * 10);
  };
  run();
};
