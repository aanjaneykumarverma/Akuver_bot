module.exports = {
  name: 'ping',
  description: 'Returns latency & API Ping',
  usage: ' ',
  category: 'Misc',
  async execute(message, args) {
    const client = message.client;
    const msg = await message.channel.send('Pinging...');
    msg.edit(
      `**Bot Latency:** **\`${
        Date.now() - message.createdTimestamp
      }\` ** ms \n**API Latency:** **\`${Math.round(client.ws.ping)}\`** ms`
    );
  },
};
