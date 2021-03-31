const channelNameStart = 'Among Us';
module.exports = {
  name: 'voiceStateUpdate',
  execute(oldState){
    const {channel} = oldState;
    if(
      channel &&
      channel.name.startsWith(channelNameStart) &&
      channel.members.size === 0
    ){
      channel.delete();
    }
  }
}
