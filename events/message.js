const {prefix}=require('../config.json');
const Discord = require('discord.js');
const cooldowns = new Discord.Collection();
module.exports = {
  name: 'message',
  execute(message){
    if(!message.content.startsWith(prefix) || message.author.bot) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/);   // trim removes whitespaces from both sides of string
    const commandName = args.shift().toLowerCase();
    const client = message.client;
    if(!client.commands.has(commandName)) {
      message.reply("Invalid commnand. Send !help to get a list of all possible commands.");
      return;
    }
    const command = client.commands.get(commandName);
    if(!cooldowns.has(command.name)){
      cooldowns.set(command.name,new Discord.Collection());
    }
    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown||3)*1000;
    if(timestamps.has(message.author.id)){
      const expirationtime = timestamps.get(message.author.id) + cooldownAmount;
      if(now<expirationtime){
        const timeLeft = (expirationtime - now)/1000;
        return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
      }
    }
    timestamps.set(message.author.id,now);
    setTimeout(()=>timestamps.delete(message.author.id), cooldownAmount);
    try{
      command.execute(message,args);
    } catch(error){
      console.error(error);
      message.reply('There was an error while trying to execute that command!');
    }
  },
};
