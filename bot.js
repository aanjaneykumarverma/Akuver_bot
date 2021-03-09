require("dotenv").config();
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const folder of commandFolders) {
  const commandFiles = fs.readdirSync(`./commands/${folder}`).filter(file => file.endsWith('.js'));
  for(const file of commandFiles){
	   const command = require(`./commands/${folder}/${file}`);
	   client.commands.set(command.name, command);
   }
}

for (const file of eventFiles){
  const event = require(`./events/${file}`);
  if(event.once){
    client.once(event.name, (...args) => event.execute(...args,client));  /// (...x) is the spread operator, can handle variable no. of args
  } else{
    client.on(event.name, (...args) => event.execute(...args,client));
  }

}
client.login(process.env.token);
