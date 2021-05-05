const mongo = require('../util/mongo.js');
const profileSchema = require('../schemas/profile-schema.js');

const coinsCache = {};

module.exports = (client) => {};

module.exports.addCoins = async (guildId, userId, coins) => {
  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOneAndUpdate()');

      const result = await profileSchema.findOneAndUpdate(
        {
          guildId,
          userId,
        },
        {
          guildId,
          userId,
          $inc: {
            coins,
          },
        },
        {
          upsert: true,
          new: true,
        }
      );

      console.log('RESULT:', result);

      coinsCache[`${guildId}-${userId}`] = result.coins;

      return result.coins;
    } catch (err) {
      console.log(err.message);
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.getCoins = async (guildId, userId) => {
  const cachedValue = coinsCache[`${guildId}-${userId}`];
  if (cachedValue) {
    return cachedValue;
  }

  return await mongo().then(async (mongoose) => {
    try {
      console.log('Running findOne()');

      const result = await profileSchema.findOne({
        guildId,
        userId,
      });

      console.log('RESULT:', result);

      let coins = 0;
      if (result) {
        coins = result.coins;
      } else {
        console.log('Inserting a document');
        await new profileSchema({
          guildId,
          userId,
          coins: coins,
        }).save();
      }

      coinsCache[`${guildId}-${userId}`] = coins;

      return coins;
    } catch (err) {
      console.log(err.message);
    } finally {
      mongoose.connection.close();
    }
  });
};

module.exports.sort = async (guildId, max) => {
  return await mongo().then(async (mongoose) => {
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
    } finally {
      mongoose.connection.close();
    }
  });
};
