require('dotenv').config();
const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Discord.Client();
const { Player } = require('discord-player');

client.commands = new Discord.Collection();
client.player = new Player(client);
client.filters = config.filters;

const commandFolders = fs.readdirSync('./commands');
const eventFiles = fs
  .readdirSync('./events')
  .filter((file) => file.endsWith('.js'));
const playerFiles = fs
  .readdirSync('./player')
  .filter((file) => file.endsWith('.js'));

for (const folder of commandFolders) {
  const commandFiles = fs
    .readdirSync(`./commands/${folder}`)
    .filter((file) => file.endsWith('.js'));
  for (const file of commandFiles) {
    const command = require(`./commands/${folder}/${file}`);
    client.commands.set(command.name, command);
  }
}

for (const file of eventFiles) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args, client));
  } else {
    client.on(event.name, (...args) => event.execute(...args, client));
  }
}

for (const file of playerFiles) {
  const event = require(`./player/${file}`);
  client.player.on(event.name, (...args) => event.execute(...args, client));
}

client.login(process.env.token);
