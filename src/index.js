import './styles.css';
var debounce = require('lodash.debounce');
import fetchImages from './fetchimg.js';
import { error } from '@pnotify/core';
import '@pnotify/core/dist/BrightTheme.css';
import '@pnotify/core/dist/PNotify.css';

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
  // console.log(input.value);

  if (input.value !== '') {
    // console.log('ура'+input.value);
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
    // console.log('ура2'+input.value);
    // fetchImages.fetchImages = input.value;
    fetchImages.fetchImg(onGetData);
  }
  // const top = document.querySelector('.gallery').getBoundingClientRect().top;
  //       console.log(top);
  //       window.scrollTo({
  //         top, // скрол так чтобы элемент оказался в верху страницы
  //         behavior: 'smooth', // чтобы было плавным
  //       });
}

function printCountriesList(imgArray) {
  // document.querySelector('searchRes').innerHTML='';

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
  // console.log(countries)

  searchResult.insertAdjacentHTML('beforeend', images);

  // const onEntry = (entries, observer) => {
    // entries.forEach(entry => {
      // if (entry.isIntersecting) {
        // console.log(entry.target);
        // const top = entry.target.getBoundingClientRect().top;
const domChildrenLength= document.querySelector('.gallery').children.length;
        const top = document.querySelector('.gallery').children[domChildrenLength-fetchImages.per_page].getBoundingClientRect().top;
        // const top1 =top.getBoundingClientRect().top;
        // console.log(document.querySelector('.gallery').children[2]);
        console.log(document.querySelector('.gallery').children[domChildrenLength-fetchImages.per_page]);
        console.log(top);
        // console.log(top1);
        // console.log(document.querySelector('.gallery'))
        window.scrollTo({
          top, // скрол так чтобы элемент оказался в верху страницы
          behavior: 'smooth', // чтобы было плавным
        });
      // }
      // observer.disconnect();
    // });
  // };

  // const observer = new IntersectionObserver(onEntry, {});
  // const imgItems = document.querySelectorAll('.photo-card');

  // imgItems.forEach(imgItem => {
    // observer.observe(imgItem);
  // });
}

function printError(obj) {
  searchResult.innerHTML = '';

  const myError = error({
    text: 'Too many matches found. Please enter more specific query!',
    delay: 1500,
  });
}
