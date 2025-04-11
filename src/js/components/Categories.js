import {templates} from '../settings.js';

class Categories {
  constructor(element, categories, data, global) {
    const thisCategories = this;

    thisCategories.categoryList = categories;
    thisCategories.data = data;
    thisCategories.hiddenSongs = [];
    thisCategories.global = global;

    thisCategories.render(element, categories);
    thisCategories.initWidget();


  }

  render(element, categories) {
    const thisCategories = this;

    const generatedHTML = templates.categories(categories);

    thisCategories.dom = {};
    thisCategories.dom.wrapper = element;
    thisCategories.dom.wrapper.innerHTML = generatedHTML;
  }

  initWidget() {
    const thisCategories = this;
    thisCategories.clickedCategory = null;

    const categoryList = thisCategories.dom.wrapper.querySelector('.categories-list');

    categoryList.addEventListener('click', function (event) {
      event.preventDefault();
      const clickedElement = event.target;
      const categoryElement = clickedElement.closest('.category');

      if (categoryElement) {
        const categoryId = categoryElement.id;

        if (thisCategories.clickedCategory && thisCategories.clickedCategory !== categoryId) {
          const previouslySelected = document.getElementById(thisCategories.clickedCategory);
          previouslySelected.classList.remove('active');
          thisCategories.clickedCategory = null;

        }
        thisCategories.clickedCategory = thisCategories.clickedCategory ? null : categoryId;
        categoryElement.classList.toggle('active');
        thisCategories.filterSongs(thisCategories.clickedCategory);
        thisCategories.global.stopPlayer();
      }
    });


  }

  filterSongs(category) {
    const thisCategories = this;
    console.log('🔎 Aktywna kategoria:', category);

    const songElements = document.querySelectorAll('#home .songs');

    // Jeśli nie ma aktywnej kategorii → pokaż wszystkie piosenki
    if (!category) {
      console.log('✅ Resetowanie listy piosenek...');
      songElements.forEach(song => song.classList.remove('hidden'));
      return;
    }

    thisCategories.hiddenSongs = [];

    songElements.forEach(songElement => {
      const songId = parseInt(songElement.dataset.id); // Pobieramy ID z dataset
      const song = thisCategories.data.songs.find(s => s.id === songId);

      if (!song) {
        console.error(`🚨 Piosenka z ID ${songId} nie istnieje w danych`);
        return;
      }

      if (!song.categories.includes(category)) {
        console.log(`❌ Ukrywam: ${song.title}`);
        songElement.classList.add('hidden');
        thisCategories.hiddenSongs.push(song);
      } else {
        console.log(`✅ Widoczna: ${song.title}`);
        songElement.classList.remove('hidden');
      }
    });

    console.log('🎵 Ukryte piosenki:', thisCategories.hiddenSongs.length);
  }
}


export default Categories;