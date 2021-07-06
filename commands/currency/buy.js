const currency = require('../../features/currency');
const inventorySchema = require('../../schemas/inventory-schema');
const factory = require('../../util/factory');
const { Vip, Car, Mansion, JetSki } = require('../../config.json');

module.exports = {
  name: 'buy',
  description: 'Buy something from the store!',
  usage: ' [ITEM]',
  guildOnly: true,
  async execute(message, args) {
    const user = message.author;
    const guildId = message.guild.id;
    const userId = user.id;
    const doc = await factory.getOne(inventorySchema, { guildId, userId });
    const coins = await currency.getCoins(guildId, userId);
    if (!doc) await factory.createOne(inventorySchema, { guildId, userId });
    if (!args) {
      return message.reply('Please specify something to buy!');
    }
    const item = args[0].toLowerCase();
    switch (item) {
      case 'vip':
        if (coins < Vip)
          return message.reply("You don't have enough money to buy this item!");
        await currency.addCoins(guildId, userId, -Vip);
        await factory.updateOne(
          inventorySchema,
          { guildId, userId },
          {
            guildId,
            userId,
            $inc: {
              vip: 1,
            },
          }
        );

        break;
      case 'car':
        if (coins < Car)
          return message.reply("You don't have enough money to buy this item!");
        await currency.addCoins(guildId, userId, -Car);
        await factory.updateOne(
          inventorySchema,
          { guildId, userId },
          {
            guildId,
            userId,
            $inc: {
              car: 1,
            },
          }
        );

        break;
      case 'mansion':
        if (coins < Mansion)
          return message.reply("You don't have enough money to buy this item!");
        await currency.addCoins(guildId, userId, -Mansion);
        await factory.updateOne(
          inventorySchema,
          { guildId, userId },
          {
            guildId,
            userId,
            $inc: {
              mansion: 1,
            },
          }
        );

        break;
      case 'jetski':
        if (coins < JetSki)
          return message.reply("You don't have enough money to buy this item!");
        await currency.addCoins(guildId, userId, -JetSki);
        await factory.updateOne(
          inventorySchema,
          { guildId, userId },
          {
            guildId,
            userId,
            $inc: {
              jetski: 1,
            },
          }
        );
        break;
      default:
        return message.reply('Please enter a valid item!');
        break;
    }
    message.reply('You successfully bought the mentioned item!');
  },
};
