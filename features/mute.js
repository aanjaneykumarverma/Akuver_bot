const muteSchema = require('../schemas/mute-schema');
const factory = require('../util/factory');
module.exports.async = true;
module.exports = async (client) => {
  const checkMutes = async () => {
    const now = new Date();
    const filter = {
      expires: {
        $lt: now,
      },
      current: true,
    };

    const results = await factory.getAll(muteSchema, filter);
    if (results && results.length) {
      for (const result of results) {
        const { guildId, userId, curRoles } = result;
        const guild = client.guilds.members.get(guildId);
        const member = (await guild.members.fetch()).get(userId);
        const mutedRole = guild.roles.cache.find((role) => {
          return role.name === 'Muted';
        });
        member.roles.remove(mutedRole);
        for (const role of curRoles) {
          guild.roles.cache.find((Role) => {
            if (Role.name == role) {
              guildMember.roles.add(Role);
              return;
            }
          });
        }
      }
      await factory.updateAll(muteSchema, filter, { current: false });
    }

    setTimeout(checkMutes, 1000 * 60 * 10);
  };
  await checkMutes();
  client.on('guildMemberAdd', async (member) => {
    const { guild, id } = member;
    const currentMute = await factory.getOne(muteSchema, {
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
  });
};
