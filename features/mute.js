const muteSchema = require('../schemas/mute-schema');
module.exports.async = true;
module.exports = async (client) => {
  const checkMutes = async () => {
    const now = new Date();
    const conditional = {
      expires: {
        $lt: now,
      },
      current: true,
    };
    try {
      const results = await muteSchema.find(conditional);
      if (results && results.length) {
        for (const result of results) {
          const { guildId, userId } = result;
          const guild = client.guilds.members.get(guildId);
          const member = (await guild.members.fetch()).get(userId);
          const mutedRole = guild.roles.cache.find((role) => {
            return role.name === 'Muted';
          });
          member.roles.remove(mutedRole);
        }
        await muteSchema.updateMany(conditional, {
          current: false,
        });
      }
    } catch (err) {
      console.log(err);
    }
    setTimeout(checkMutes, 1000 * 60 * 10);
  };
  await checkMutes();
  client.on('guildMemberAdd', async (member) => {
    const { guild, id } = member;
    try {
      const currentMute = await muteSchema.findOne({
        userId: id,
        current: true,
      });
      if (currentMute) {
        const role = guild.roles.cache.find((role) => {
          return role.name === 'Muted';
        });
        if (role) {
          member.roles.add(role);
        }
      }
    } catch (err) {
      console.log(err);
    }
  });
};
