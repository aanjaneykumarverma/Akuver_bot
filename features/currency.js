const profileSchema = require('../schemas/profile-schema');
const factory = require('../util/factory');
const coinsCache = {};

module.exports = (client) => {};

module.exports.addCoins = async (guildId, userId, coins) => {
  console.log('Running findOneAndUpdate()');
  const result = await factory.updateOne(
    profileSchema,
    { guildId, userId },
    {
      guildId,
      userId,
      $inc: {
        coins,
      },
    }
  );
  console.log('RESULT:', result);
  coinsCache[`${guildId}-${userId}`] = result.coins;
  return result.coins;
};

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`];
  if (cachedValue) {
    return cachedValue;
  }

  console.log('Running findOne()');
  const result = await factory.getOne(profileSchema, { guildId, userId });

  console.log('RESULT:', result);

  let coins = 0;
  if (result) {
    coins = result.coins;
  } else {
    console.log('Inserting a document');
    await factory.createOne(profileSchema, {
      guildId,
      userId,
      coins,
    });
  }

  coinsCache[`${guildId}-${userId}`] = coins;
  return coins;
};

module.exports.sort = async (guildId, max) => {
  try {
    console.log('Running sort query');
    const all = await profileSchema
      .find({ guildId: guildId })
      .sort({ coins: 'desc' })
      .limit(max);
    console.log('All:', all);
    return all;
  } catch (err) {
    console.log(err.message);
  }
};
