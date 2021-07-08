module.exports = {
  name: 'playlistAdd',
  execute(message, queue, playlist) {
    message.channel.send(
      `${playlist.title} has been added to the queue (**${playlist.tracks.length}** songs) !`
    );
  },
};
