const { prefix: globalPrefix } = require('../../config.json');
const { prefix } = require('../../util/update');
module.exports = {
  name: 'help',
  description: 'lists all valid commands with their usage.',
  usage: ' ',
  category: 'Utility',
  cooldown: 5,
  guildOnly: true,
  execute(message, args) {
    const data = [];
    let commandsMap = {};
    const { commands } = message.client;
    const prefix_guild = prefix[message.guild.id.toString()]
      ? prefix[message.guild.id.toString()]
      : globalPrefix;
    if (!args.length) {
      data.push('Here is a list of all of my commands:\n');
      for (let command of commands) {
        command = command[1];
        if (!commandsMap[command.category]) commandsMap[command.category] = [];
        let permissions = command.permissions || '';
        if (permissions) {
          let hasPermission = true;
          if (typeof permissions === 'string') {
            permissions = permissions.split(',');
          }
          for (const permission of permissions) {
            if (!message.member.hasPermission(permission)) {
              hasPermission = false;
              break;
            }
          }
          if (!hasPermission) {
            continue;
          }
        }
        const mainCommand = command.name;
        const commandInfo = `${prefix_guild}${mainCommand}`;
        commandsMap[command.category].push(commandInfo);
      }
      for (const category in commandsMap) {
        if (!commandsMap[category].length) continue;
        data.push(`\n*****${category}*****\n`);
        for (const command of commandsMap[category]) data.push(`${command}\n`);
      }
      data.push(
        `\nYou can send \`${prefix_guild}help command_name\` to get info on a specific command!`
      );

      return message.author
        .send(data, { split: true, code: true })
        .then(() => {
          // splits msgs into 2 or more if charlength>2000
          if (message.channel.type === 'dm') return;
          message.reply("I've sent you a DM with all my commands.");
        })
        .catch((error) => {
          console.error(`Could not send DM to ${message.author.tag}.\n`, error);
          message.reply("it seems destiny doesn't want me to DM you.");
        });
    }

    const name = args[0].toLowerCase();
    const command = message.client.commands.get(name);

    if (!command) {
      return message.reply("That's not a valid command.");
    }

    data.push(`Name: ${command.name}`);
    data.push(`Category : ${command.category}`);
    if (command.description) data.push(`Description: ${command.description}`);
    if (command.usage)
      data.push(`Usage: ${prefix_guild}${command.name} ${command.usage}\n`);
    data.push(`Cooldown: ${command.cooldown || 3}second(s)`);
    message.channel.send(data, { split: true });
  },
};
