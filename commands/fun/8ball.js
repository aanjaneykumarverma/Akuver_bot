const { MessageEmbed } = require('discord.js');
const answers = [
  'Oh hell yeah',
  'Hello no',
  'Yes I guess ?',
  'Probably wrong',
  'You never know',
  'I guess ?',
  "Well tbh I don't know",
  'Umm maybe ?',
  'Nah',
  'Yup',
  'I have a doubt',
  'Cannot predict now',
  'I can see it',
];

module.exports = {
  name: '8ball',
  description: 'Lets see what the magic ball has to say!',
  usage: ' question',
  execute(message, args) {
    const question = args.join(' ');
    if (!question) {
      return message.reply(
        "Please provide a question to ask, or are you dumb & can't even do that!!"
      );
    }
    const answer = answers[Math.floor(Math.random() * answers.length)];
    const embed = new MessageEmbed()
      .setColor('#0099ff')
      .setTitle('8-Ball')
      .addField('Question', `${question}`)
      .addField('Answer', `${answer}`)
      .setFooter(
        `Asked by ${message.member.displayName}`,
        message.author.displayAvatarURL({ dynamic: true })
      )
      .setTimestamp();
    message.channel.send(embed);
  },
};
