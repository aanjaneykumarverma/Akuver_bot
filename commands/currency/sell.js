const currency = require('../../features/currency');
const inventorySchema = require('../../schemas/inventory-schema');
const factory = require('../../util/factory');
const { Car, Mansion, JetSki } = require('../../config.json');
module.exports = {
  name: 'sell',
  description: 'Sell an item from your collection!',
  usage: ' [ITEM]',
  category: 'Currency',
  guildOnly: true,
  async execute(message, args) {
    const user = message.author;
    const guildId = message.guild.id;
    const userId = user.id;
    if (!args[0]) return message.reply('Please specify something to sell!');
    const doc = await factory.getOne(inventorySchema, { guildId, userId });
    if (!doc) return message.reply('You have nothing to sell!');

    const item = args[0].toLowerCase();
    switch (item) {
      case 'vip':
        return message.reply('You cannot sell the VIP pass!');
        break;
      case 'car':
        if (doc.car < 1) return message.reply('You have no cars to sell!');
        await currency.addCoins(message.guild.id, user.id, Car);
        await factory.updateOne(
          inventorySchema,
          { guildId, userId },
          {
            guildId,
            userId,
            $inc: {
              car: -1,
            },
          }
        );

        break;
      case 'mansion':
        if (doc.mansion < 1)
          return message.reply('You have no mansions to sell!');
        await currency.addCoins(message.guild.id, user.id, Mansion);
        await factory.updateOne(
          inventorySchema,
          { guildId, userId },
          {
            guildId,
            userId,
            $inc: {
              mansion: -1,
            },
          }
        );
        break;
      case 'jetski':
        if (doc.jetski < 1)
          return message.reply('You have no jetskis to sell!');
        await currency.addCoins(message.guild.id, user.id, JetSki);
        await factory.updateOne(
          inventorySchema,
          { guildId, userId },
          {
            guildId,
            userId,
            $inc: {
              jetski: -1,
            },
          }
        );
        break;
      default:
        return message.reply('Please enter a valid item!');
        break;
    }
    message.reply('You successfully sold the mentioned item!');
  },
};
