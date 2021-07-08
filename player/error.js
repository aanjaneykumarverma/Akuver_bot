module.exports = {
  name: 'error',
  execute(error, message, ...args) {
    const { channel } = message;
    switch (error) {
      case 'NotPlaying':
        channel.send(`There is no music being played on this server!`);
        break;
      case 'NotConnected':
        channel.send(`You are not connected in any voice channel!`);
        break;
      case 'UnableToJoin':
        channel.send(
          `I am not able to join your voice channel, please check my permissions!`
        );
        break;
      case 'VideoUnavailable':
        channel.send(
          `${args[0].title} is not available in your country! Skipping...`
        );
        break;
      case 'MusicStarting':
        channel.send(`The music is starting... please wait and retry!`);
        break;
      default:
        channel.send(`Something went wrong ... Error : ${error}`);
    }
  },
};
