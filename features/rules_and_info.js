const firstMsg = require('../util/first_msg.js');
const { prefix } = require('../config.json');
module.exports = (client) => {
  const channelId = '815477746310184962';
  const botId = '815474132182368256';
  const roleChannelId = '826000469800517713';
  let text = [];
  text.push('Welcome to the server!');
  text.push('**Rules:**');
  text.push('1. No spamming, advertising, or illegal activity.');
  text.push('2. No hateful or inappropriate messages.');
  text.push(
    '3. No excessive cursing or cursing towards another member in a disrespectful way.'
  );
  text.push('4. Use the appropriate channels for your topic when possible.');
  text.push(
    '5. Do not ping people out of nowhere unless you have a good reason.'
  );
  text.push(`**Verify yourself and claim roles in <#${roleChannelId}>**`);
  text.push(`**Send ${prefix}help to get the list of commands. **`);
  text.join('\n');
  firstMsg(client, channelId, text);
};
