const fetch = require('node-fetch');
const { URLSearchParams } = require('url');

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

const url = 'https://api.imgflip.com/caption_image';

module.exports = {
  name: 'meme',
  description: 'Make a meme, using a variety of templates',
  usage: ' [template] [Top_Text] - [Bottom_Text]',
  category: 'Image',
  guildOnly: true,
  async execute(message, args) {
    if (!args[0]) return message.reply('Please provide a template');
    const template = args[0].toString();
    args.shift();
    const texts = args.join('%');
    const meme_text = texts.split('-');
    const top_text = meme_text[0].split('%').join(' ');
    const bottom_text = meme_text[1].split('%').join(' ');
    const meme_type_id = meme_dict[template];
    if (!meme_type_id)
      return message.reply(
        'Please provide a valid template. Use memetemp command to get a list of valid templates.'
      );
    if (!top_text && !bottom_text)
      return message.reply('Please mention text for the meme.');
    const params = new URLSearchParams();
    params.append('template_id', meme_type_id);
    params.append('username', process.env.IMGFLIP_USERNAME);
    params.append('password', process.env.IMGFLIP_PASSWORD);
    params.append('text0', top_text);
    params.append('text1', bottom_text);
    const meme = await fetch(url, {
      method: 'POST',
      body: params,
    }).then((res) => res.json());
    message.channel.send(
      `Meme created by ${message.author} \n ${meme.data.url}`
    );
  },
};
