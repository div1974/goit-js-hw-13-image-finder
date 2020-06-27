import './styles.css';
var debounce = require('lodash.debounce');
import fetchImages from './fetchimg.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';
import * as basicLightbox from 'basiclightbox';
import '../node_modules/basiclightbox/dist/basicLightbox.min.css';

document.querySelector('.intro').insertAdjacentHTML(
  'afterbegin',
  `
<form class="search-form" id="search-form">
<input
  type="text"
  name="query"
  autocomplete="off"
  placeholder="Search images..."
/>
</form>`,
);

const searchResult = document.querySelector('.gallery');
const oninput = debounce(searchData, 1500);
const input = document.querySelector('.search-form').elements.query;
input.addEventListener('input', oninput);
const LoadMoreBtn = document.querySelector('button[data-action="Load-more"]');
LoadMoreBtn.addEventListener('click', LoadMoreBtnAction);

function searchData(e) {
  if (input.value !== '') {
    searchResult.innerHTML = '';
    fetchImages.resetPage();
    fetchImages.searchQuery = input.value;

    fetchImages.fetchImg(onGetData);
  }
}

function onGetData(data) {
  printCountriesList(data);
}

function LoadMoreBtnAction() {
  if (input.value !== '') {
    fetchImages.fetchImg(onGetData);
  }
}

function printCountriesList(imgArray) {
  const Handlebars = require('handlebars');
  const template = Handlebars.compile(`


  {{#each this.hits}}
    <li class="gallery__item" >
    
    <div class="photo-card">
  <img src="{{previewURL}}" alt="" style='width:100px; height:90px'/>

  <div class="stats">
    <p class="stats-item" style='display:flex'>
      <i class="material-icons">thumb_up</i><span style='font-size:14px'>{{likes}}</span>
    </p>
    <p class="stats-item" style='display:flex'>
      <i class="material-icons">visibility</i><span style='font-size:14px'>{{views}}</span>
    </p>
    <p class="stats-item" style='display:flex'>
      <i class="material-icons">comment</i><span style='font-size:14px'>{{comments}}</span>
    </p>
    <p class="stats-item" style='display:flex'>
      <i class="material-icons">cloud_download</i><span style='font-size:14px'>{{downloads}}</span>
    </p>
  </div>
</div>
    </li>
    {{/each}}
    
  
  
  `);

  const images = template(imgArray);

  searchResult.insertAdjacentHTML('beforeend', images);

  const domChildrenLength = document.querySelector('.gallery').children.length;
  const top = document
    .querySelector('.gallery')
    .children[domChildrenLength - fetchImages.per_page].getBoundingClientRect()
    .top;

  setTimeout(() => {
    scrollTo({
      top: top + window.pageYOffset,
      behavior: 'smooth',
    });
  }, 1500);

  const imgItems = document.querySelectorAll('.photo-card >img');

  imgItems.forEach(function (entry) {
    entry.addEventListener('click', function (event) {
      event.preventDefault();

      const bigImg = imgArray.hits.filter(e => {
        return e.previewURL === event.target.src;
      });

      const instance = basicLightbox.create(`
    
    <img src=${bigImg[0].largeImageURL} width="800" height="600">
    
`);

      instance.show();
    });
  });
}

function printError(obj) {
  searchResult.innerHTML = '';

  const myError = error({
    text: 'Too many matches found. Please enter more specific query!',
    delay: 1500,
  });
}
