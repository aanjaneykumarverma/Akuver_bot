module.exports = {
  name: 'removerole',
  description: 'Remove a role from the specified user',
  usage: ' @Member <Role>',
  category: 'Moderation',
  permissions: 'ADMINISTRATOR',
  guildOnly: true,
  execute(message, args) {
    const { guild } = message;
    const targetUser = message.mentions.users.first();
    if (!targetUser)
      return message.reply('Please specify someone to remove a role from.');

    args.shift();

    const roleName = args.join(' ');

    const role = guild.roles.cache.find((role) => {
      return role.name === roleName;
    });

    if (!role)
      return message.reply(`There is no role with the name "${roleName}"`);

    const member = guild.members.cache.get(targetUser.id);

    if (member.roles.cache.get(role.id)) {
      member.roles.remove(role);
      message.reply(`That user no longer has the ${roleName} role`);
    } else {
      message.reply(`That user does not have the ${roleName} role`);
    }
  },
};
