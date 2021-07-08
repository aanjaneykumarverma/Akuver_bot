module.exports = {
  name: 'giverole',
  description: 'Give a role to the specified user',
  usage: ' @Member <Role>',
  category: 'Moderation',
  permissions: 'ADMINISTRATOR',
  guildOnly: true,
  execute(message, args) {
    const targetUser = message.mentions.users.first();
    if (!targetUser) {
      return message.reply('Please specify someone to give a role to. ');
    }
    args.shift();
    const roleName = args.join(' ');
    const { guild } = message;
    const role = guild.roles.cache.find((role) => {
      return role.name === roleName;
    });
    if (!role) {
      return message.reply('Please mention a valid role!');
    }
    const member = guild.members.cache.get(targetUser.id);
    member.roles.add(role);
    message.reply('Successfully assigned the role to the mentioned user.');
  },
};
