require('dotenv').config;
const Discord = require('discord.js');
const fetch = require('node-fetch');
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q=';
module.exports = {
  name: 'weather',
  description: 'Provides the weather of the city.',
  usage: '[city_name]',
  cooldown: 5,
  async execute(message, args) {
    const city = args[0];
    const url = `${baseURL}${city}&units=metric&appid=${process.env.weatherAPI}`;
    const Weather = await fetch(url).then((response) => response.json());
    const embed = new Discord.MessageEmbed()
      .setColor('#0099ff')
      .setTitle('Weather Info')
      .addFields(
        { name: 'Description', value: `${Weather.weather[0].description}` },
        { name: '\u200B', value: '\u200B' }, // blank field
        { name: 'Temperature', value: `${Weather.main.temp}°C`, inline: true },
        { name: 'Wind', value: `${Weather.wind.speed}`, inline: true }
      )
      .setTimestamp()
      .setFooter('by openweather API');
    message.channel.send(embed);
  },
};
