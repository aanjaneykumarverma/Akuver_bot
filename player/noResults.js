module.exports = {
  name: 'noResults',
  execute(message, query) {
    message.channel.send(`No results found on YouTube for ${query}!`);
  },
};
