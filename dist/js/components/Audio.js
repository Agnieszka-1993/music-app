import { templates } from '../settings.js';
import AudioPlayer from './AudioPlayer.js';
import utils from '../utils.js';

class Audio {
  constructor(data, wrapper) {
    const thisAudio = this;

    thisAudio.lastPlayedSong = null;

    thisAudio.data = data;
    thisAudio.wrapper = wrapper;

    thisAudio.render(thisAudio.wrapper);

    thisAudio.audioPlayer();
  }

  render(wrapper) {
    const thisAudio = this,
      generatedHTML = templates.audio(thisAudio.data),
      audioConteiner = document.querySelector(wrapper);

    thisAudio.element = utils.createDOMFromHTML(generatedHTML);
    audioConteiner.appendChild(thisAudio.element);
  }

  audioPlayer() {
    const thisAudio = this;

    thisAudio.greenAudioPlayer = new AudioPlayer(thisAudio.wrapper, thisAudio.data.id);
    console.log(thisAudio.greenAudioPlayer.playerId)
    thisAudio.player = document.querySelector(thisAudio.greenAudioPlayer.playerId + 'audio');
    thisAudio.player.addEventListener('play',function(){
      thisAudio.lastPlayedSong = thisAudio.greenAudioPlayer.playerId.slice(-1);
    });
  }
}

export default Audio;