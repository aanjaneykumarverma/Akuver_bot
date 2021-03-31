const {prefix} = require('../../config.json');

module.exports = {
  name: 'help',
  description: 'lists all valid commands with their usage.',
  usage: '[command name]',
  cooldown: 5,
  execute(message,args){
    const data = [];
    const {commands} = message.client;
    if(!args.length){
      data.push("Here is a list of all of my commands: ");
      data.push(`\`${commands.map(command => command.name).join(', ')}\``);
      data.push(`\nYou can send \`${prefix}help [command name]\` to get info on a specific command!`);

      return message.author.send(data, {split:true}).then(()=>{                     // splits msgs into 2 or more if charlength>2000
        if(message.channel.type=='dm') return;
        message.reply('I\'ve sent you a DM with all my commands.');
      })
      .catch(error=>{
        console.error(`Could not send DM to ${message.author.tag}.\n`,error);
        message.reply('it seems destiny doesn\'t want me to DM you.');
      })
    }
    const name = args[0].toLowerCase();
    const command = message.client.commands.get(name);
    if(!command){
      return message.reply('That\'s not a valid command.');
    }

    data.push(`Name: ${command.name}`);
    if(command.description) data.push(`Description: ${command.description}`);
    if(command.usage) data.push(`Usage: ${prefix}${command.name} ${command.usage}\n`);

    data.push(`Cooldown: ${command.cooldown||3}second(s)`);
    message.channel.send(data, {split:true});
  }

};
