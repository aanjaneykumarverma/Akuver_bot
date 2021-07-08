const fetch = require('node-fetch');
const baseURL = 'https://v2.jokeapi.dev';
const categories = ['Programming', 'Misc', 'Pun', 'Spooky', 'Christmas'];
const params = ['blacklistFlags=nsfw,religious,racist', 'idRange=0-100'];

module.exports = {
  name: 'joke',
  description: 'Shares a joke.',
  usage: ' ',
  category: 'Fun',
  async execute(message, args) {
    const Joke = await fetch(
      `${baseURL}/joke/${categories.join(',')}?${params.join('&')}`
    ).then((response) => response.json());
    if (Joke.type == 'single') {
      message.channel.send(Joke.joke);
    } else {
      message.channel.send(Joke.setup);
      setTimeout(() => {
        message.channel.send(Joke.delivery);
      }, 3000);
    }
  },
};
