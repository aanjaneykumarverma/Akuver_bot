const fetch = require('node-fetch');

const meme_dict = {
  "Idon'talways": '61532',
  waitingskeleton: '4087833',
  onedoesnotsimply: '61579',
  braceyourselves: '61546',
  party: '5496396',
  fwp: '61539',
  oprah: '28251713',
  office: '563423',
  wonka: '61582',
  bf: '112126428',
  yodawg: '101716',
  spongebob: '102156234',
  rollsafe: '89370399',
  wtf: '245898',
  toodamnhigh: '61580',
  spongebob: '61581',
  car: '124822590',
  skeptical: '61520',
  allthethings: '61533',
  whatif: '100947',
  grandma: '61556',
  thenisaid: '922147',
};

module.exports = {
  name: 'memetemp',
  description: 'Get a list of all meme templates',
  usage: ' ',
  category: 'image',
  guildOnly: true,
  execute(message, args) {
    const meme_templates = Object.keys(meme_dict).join(', ');
    message.channel.send(
      `Here is a list of all meme templates:\n${meme_templates}`
    );
  },
};
