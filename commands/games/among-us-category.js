const amongUsCategorySchema = require('../../schemas/among-us-category-schema');
const factory = require('../../util/factory');

module.exports = {
  name: 'aucatset',
  description: 'Sets a category for Among Us voice channel.',
  usage: ' categoryName',
  guildOnly: true,
  permissions: 'ADMINISTRATOR',
  async execute(message, args) {
    let categoryName = args;
    categoryName = categoryName.join(' ');
    const category = message.guild.channels.cache.find(
      (cat) => cat.name === categoryName
    );
    if (!category) {
      message.reply('Please specify a category Name.');
      return;
    }
    await factory.updateOne(
      amongUsCategorySchema,
      { _id: message.guild.id },
      { _id: message.guild.id, categoryId: category.id }
    );
    message.reply('Among us category set!');
  },
};
