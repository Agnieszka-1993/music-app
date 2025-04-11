import { templates, select } from '../settings.js';
import Audio from './Audio.js';

class Search {
  constructor(element, data, categories) {
    const thisSearch = this;

    thisSearch.render(element, categories);
    thisSearch.getElements();
    thisSearch.initWidget(data);

  }

  render(element, categories) {
    const thisSearch = this;

    const generatedHTML = templates.search(categories);

    thisSearch.dom = {};
    thisSearch.dom.wrapper = element;
    thisSearch.dom.wrapper.innerHTML = generatedHTML;
  }

  getElements() {
    const thisSearch = this;

    thisSearch.dom.form = document.querySelector(select.search.form);
    thisSearch.nameInput = thisSearch.dom.form.querySelector(select.search.input);
    thisSearch.categoryInput = thisSearch.dom.form.querySelector(select.search.category);
    thisSearch.dom.resultNumber = document.querySelector(select.search.result);
  }

  initWidget(data) {
    const thisSearch = this;

    thisSearch.dom.form.addEventListener('submit', function (event) {
      event.preventDefault();
      const audioContainer = document.querySelector(select.containerOf.searchAudio);
      audioContainer.innerHTML = '';
      thisSearch.searchAudio(thisSearch.nameInput.value, thisSearch.categoryInput.value, data);
    });
  }


  searchAudio(nameValue, categoryValue, data) {
    const thisSearch = this;
    thisSearch.audioNumber = 0;

    const searchAudioWrapper = select.containerOf.searchAudio;

    for (const song of data) {
      if (categoryValue == 0) {
        if (song.title.toLowerCase().includes(nameValue.toLowerCase())) {
          new Audio(song, searchAudioWrapper);
          thisSearch.audioNumber++;
        }
      } else if (song.title.toLowerCase().includes(nameValue.toLowerCase()) && (song.categories.includes(categoryValue))) {
        new Audio(song, searchAudioWrapper);
        thisSearch.audioNumber++;
      }
    }
    thisSearch.printValue(thisSearch.audioNumber);
  }

  printValue(value) {
    const thisSearch = this;

    if (value == 1) {
      thisSearch.dom.resultNumber.innerHTML = 'We have found ' + value + ' song...';
    } else {
      thisSearch.dom.resultNumber.innerHTML = 'We have found ' + value + ' songs...';
    }
  }

}

export default Search;