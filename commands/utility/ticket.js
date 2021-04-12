const channelID = '815477746310184966';
const check = '✅';
let registered = false;

const registerEvent = (client) => {
  if(registered){
    return;
  }
  registered = true;
  console.log('REGISTERING EVENTS');

  client.on('messageReactionAdd', (reaction,user)=>{
    if(user.bot){
      return;
    }
    console.log('HANDLE REACTION');
    const {message} = reaction;
    if(message.channel.id === channelID){
      message.delete();
    }
  });
};

module.exports = {
  name: 'ticket',
  description: 'Issue a ticket for some problem.',
  usage: '[MESSAGE]',
  guildOnly: true,
  execute(message,args){
    const {guild,member,client} = message;
    registerEvent(client);
    const channel = guild.channels.cache.get(channelID);
    const text = args.join(' ');
    channel.send(`A new ticket has been created by <@${member.id}>\n
       "${text}"\n
       Click the ${check} icon when this issue is resolved. `
     ).then((ticketMessage)=>{
       ticketMessage.react(check);
       userMessage.reply('Your ticket has been sent! Expect a reply within 24 hours.');
     });
  },
};
