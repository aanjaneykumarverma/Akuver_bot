//require("dotenv").config(); // needed for local testing only, when deployed on server line 28 can execute itself

const Discord = require('discord.js');
const fs = require('fs');
const config = require('./config.json');
const client = new Discord.Client();
const PORT = 3000;
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
client.login(config.token);
var http = require('http'); 
var request = require('request');
http.createServer(function (req, res) {     res.writeHead(200, {'Content-Type': 'text/plain'});     res.send('it is running\n'); }).listen(process.env.PORT || PORT);

const time=29*60*1000;
var requestLoop = setInterval(function(){
  request({
      url: "http://www.google.com",
      method: "GET",
      timeout: 10000,
      followRedirect: true,
      maxRedirects: 10
  },function(error, response, body){
      if(!error && response.statusCode == 200){
          console.log('success!');
      }else{
          console.log('error' + response.statusCode);
      }
  });
}, time);
//clearInterval(requestLoop);
