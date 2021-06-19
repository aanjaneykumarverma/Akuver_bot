const guildSchema = require('../schemas/guild-schema.js');
const { prefix } = require('../config.json');
const guildPrefixes = {};
const guildWelcomes = {};
const guildRules = {};
const guildRoles = {};
const guildTickets = {};
const guildPolls = {};
const guildLeaves = {};
const guildLevels = {};

module.exports.loadData = async (client) => {
  try {
    for (const guild of client.guilds.cache) {
      const guildId = guild[1].id;
      let result = await guildSchema.findOne({ _id: guildId });
      if (!result) {
        result = await guildSchema.findOneAndUpdate(
          {
            _id: guildId,
          },
          {
            _id: guildId,
            prefix: prefix,
          },
          {
            upsert: true, //update+insert
            new: true, // return the updated value; not the old one.
          }
        );
      }
      guildPrefixes[guildId] = result.prefix;
      guildWelcomes[guildId] = result.welcome;
      guildRules[guildId] = result.rules;
      guildRoles[guildId] = result.role;
      guildTickets[guildId] = result.ticket;
      guildPolls[guildId] = result.polls;
      guildLeaves[guildId] = result.leave;
      guildLevels[guildId] = result.level;
    }
  } catch (err) {
    console.log(err, 'ERROR!');
  }
};

module.exports.updateCache = (guildId, command, data) => {
  if (command === 'setprefix') {
    guildPrefixes[guildId] = data;
  } else if (command === 'setwelcome') {
    guildWelcomes[guildId] = data;
  } else if (command === ' setrule') {
    guildRules[guildId] = data;
  } else if (command === 'setrole') {
    guildRoles[guildId] = data;
  } else if (command === 'setticket') {
    guildTickets[guildId] = data;
  } else if (command === 'setpoll') {
    guildPolls[guildId] = data;
  } else if (command === 'setleave') {
    guildLeaves[guildId] = data;
  } else if (command === 'setlevel') {
    guildLevels[guildId] = data;
  }
};

module.exports.prefix = guildPrefixes;
module.exports.welcome = guildWelcomes;
module.exports.rules = guildRules;
module.exports.role = guildRoles;
module.exports.poll = guildPolls;
module.exports.ticket = guildTickets;
module.exports.leave = guildLeaves;
module.exports.level = guildLevels;
