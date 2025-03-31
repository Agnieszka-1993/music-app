import { select } from '../settings.js';

class AudioPlayer {
  constructor(sectionId, dataId){
    const thisAudioPlayer = this;

    thisAudioPlayer.render(sectionId, dataId);
    thisAudioPlayer.initPluging();
  }

  render(sectionId, dataId) {
    const thisAudioPlayer = this;

    thisAudioPlayer.playerId = (sectionId + ' ' + select.player.ready + dataId);
  }

  initPluging() {
    const thisAudioPlayer = this;

    thisAudioPlayer.greenAudioPlayer = new this.greenAudioPlayer(thisAudioPlayer.playerId, {
      stopOthersOnPlay: true,
    });
  }
}

export default AudioPlayer;