const fetch = require('node-fetch');
const { MessageEmbed } = require('discord.js');

module.exports = {
  name: 'dictionary',
  description:
    'Gives you the meaning of the word or the phrase using urban dictionary',
  usage: ' word_or_phrase',
  category: 'Misc',
  async execute(message, args) {
    if (!args.length) {
      return message.reply('You need to supply a search term.');
    }
    const query = encodeURIComponent(args.join(' '));
    const { list } = await fetch(
      `https://api.urbandictionary.com/v0/define?term=${query}`
    ).then((response) => response.json());
    if (!list.length) {
      return message.reply(`No results found for ${args.join(' ')}`);
    }
    const [answer] = list;
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle(answer.word)
      .setURL(answer.permalink)
      .addFields(
        { name: 'Definition', value: `${answer.definition}` },
        { name: 'Example', value: `${answer.example}` },
        {
          name: 'Rating',
          value: `${answer.thumbs_up} 👍   ${answer.thumbs_down} 👎`,
        }
      );
    message.channel.send(embed);
  },
};
