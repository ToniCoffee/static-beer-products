import { includeHTMLAsync, fetchByIDAsync, appendChildAt, delayAsync } from './scripts/utilities.js';
import { setHeaderLogo } from './components/header/header.js';
import { listeners } from './scripts/common.js';
import { carousel, setCarouselImg, setCarouselDescription } from './components/carousel-description/carousel-description.js';

sessionStorage.removeItem('beerData');
// sessionStorage.clear();

const response        = await includeHTMLAsync();
const beerData        = await getBeerDataAsync(10);
const sectionInfoImg  = await getSectionInfoDataAsync();

const spinner         = document.querySelector('.spinner-include');
const _carousel        = document.querySelector('.carousel-include');
const sectionInfo     = document.querySelector('.section-info');
const footer          = document.querySelector('.footer-include');

await delayAsync(1000);
let carouselImg             = document.querySelector('.carousel img');
let carouselDescription     = document.querySelector('.carousel-description-details');

setSectionInfoImg(sectionInfoImg);
initialize(carouselImg, carouselDescription, beerData);

_carousel.classList.toggle('display-none');
spinner.classList.toggle('display-none'); 
sectionInfo.classList.toggle('display-none'); 
footer.classList.toggle('display-none'); 
document.querySelector('.footer-copyright p span').innerHTML = new Date().getFullYear();

async function getBeerDataAsync(numberOfResults = 1) {
  const data = [];
  for (let i = 1; i <= numberOfResults; i++) {
    const response = await fetchByIDAsync('https://api.punkapi.com/v2/beers/', i + 54);
    data.push(response[0]);
  }
  return data;
}

async function getSectionInfoDataAsync() {
  return await fetch('https://picsum.photos/id/103/400');
}

function setSectionInfoImg(data) {
  const sectionInfo        = document.querySelector('.section-info');
  const sectionInfoImg     = document.createElement('img');

  // sectionInfoImg.classList = 'contrast-opacity';
  sectionInfoImg.src       = data.url;
  sectionInfoImg.alt       = 'imagen';
  appendChildAt(sectionInfoImg, sectionInfo, 0);
}

function initialize(carouselImg, carouselDescription, beerData) {
  listeners(carouselImg, carouselDescription, beerData);
  setHeaderLogo(beerData);
  setCarouselImg(carouselImg, beerData, 0);
  setCarouselDescription(carouselDescription, beerData, 0);
  carousel(carouselImg, carouselDescription, beerData);
}
