import { templates, select } from '../settings.js';
import Audio from './Audio.js';

class Discover {
  constructor(element, data, global) {
    const thisDiscover = this;

    thisDiscover.data = data;
    thisDiscover.listenedSongsCatObj = global.stats.listenedSongsCatObj;

    thisDiscover.render(element);
    thisDiscover.initWidget(global);

  }

  render(element) {
    const thisDiscover = this;

    const generatedHTML = templates.discovery();

    thisDiscover.dom = {};
    thisDiscover.dom.wrapper = element;
    thisDiscover.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidget(global) {
    const thisDiscover = this;

    thisDiscover.widget = thisDiscover.dom.wrapper.querySelector(select.discover.subtitle);

    thisDiscover.widget.addEventListener('click', function (event) {
      event.preventDefault();
      if (global.stats.listenedSongsCounter <= 3) {
        thisDiscover.getRandom(thisDiscover.data);
        thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.data);
      } else {
        thisDiscover.playPersonalizedSong();
      }
    });
  }

  getRandom(data) {
    const thisDiscover = this;
    thisDiscover.randomId = Math.floor(Math.random() * data.length + 1);
  }

  randomSong(id, data) {
    const thisDiscover = this;

    const randomSongWrapper = select.containerOf.randomSong;
    const songContainer = document.querySelector(randomSongWrapper);
    songContainer.innerHTML = '';
    thisDiscover.randomSongGenerator = new Audio(data[id - 1], randomSongWrapper);
  }

  playPersonalizedSong() {
    const thisDiscover = this;

    let max = 0;
    thisDiscover.categoriesToDrawArray = [];
    for (let songCategory in thisDiscover.listenedSongsCatObj) {
      if (max < thisDiscover.listenedSongsCatObj[songCategory]) {
        thisDiscover.categoriesToDrawArray = [];
        thisDiscover.categoriesToDrawArray.push(songCategory);
        max = thisDiscover.listenedSongsCatObj[songCategory];
      } else if (max == thisDiscover.listenedSongsCatObj[songCategory]) {
        thisDiscover.categoriesToDrawArray.push(songCategory);

      }

    }
    thisDiscover.songToDrawArray = [];
    for (let song of thisDiscover.data) {
      for (let category of thisDiscover.categoriesToDrawArray) {
        if (song.categories.includes(category)) {
          if (!thisDiscover.songToDrawArray.includes(song)) {
            thisDiscover.songToDrawArray.push(song);
          }
        }

      }
    }
    thisDiscover.getRandom(thisDiscover.songToDrawArray);
    thisDiscover.randomSong(thisDiscover.randomId, thisDiscover.songToDrawArray);

  }
}

export default Discover;