import { fetchByIDAsync, setSessionStorage, redirectTo } from '/scripts/utilities.js';
import { carouselLeft, carouselRight } from '/components/carousel-description/carousel-description.js';
import { openModal, closeModal } from '/components/modal/modal.js';
import { navbarAnimation } from '/components/nav-bar/nav-bar.js';
import { footerMouseHover, footerMouseOut } from '/components/footer/footer.js';

const mouseHoverActions = {
  footerSocial: function(e) { footerMouseHover(e); }
}

const mouseOutActions = {
  footerSocial: function(e) { footerMouseOut(e); } 
}

const clickActions = {
  carouselLeft:   function (e, carouselImg, carouselDescription, data) { carouselLeft(carouselImg, carouselDescription, data);  },
  carouselRight:  function (e, carouselImg, carouselDescription, data) { carouselRight(carouselImg, carouselDescription, data); },
  link: async function (e, carouselImg, carouselDescription, data) {
    if(window.location.pathname === '/') {
      const query = await fetchByIDAsync('https://api.punkapi.com/v2/beers/', carouselImg.id);
      setSessionStorage('beerData', query[0]);
      setSessionStorage('lastUrl', '/');
      redirectTo(`/static-beer-products/pages/beerDetails.html?id=${carouselImg.id}`);
    } else {
      const id = e.target.previousElementSibling.id;
      const query = await fetchByIDAsync('https://api.punkapi.com/v2/beers/', id);
      setSessionStorage('beerData', query[0]);
      setSessionStorage('lastUrl', window.location.pathname);
      closeModal();
      redirectTo(`/static-beer-products/pages/beerDetails.html?id=${id}`);
    }
  },
  products:   function (e, carouselImg, carouselDescription, data) { setSessionStorage('beersData', data);  },
  menu:       function (e, carouselImg, carouselDescription, data) { navbarAnimation();                     },
  openModal:  function (e, carouselImg, carouselDescription, data) { openModal(e, null, '#details-name');   },
  closeModal: function (e, carouselImg, carouselDescription, data) { closeModal();                          },
};

export function listeners(carouselImg, carouselDescription, data) {
  document.addEventListener('click', function (e) {
    if (clickActions[e.target.getAttribute('name')]) {
      clickActions[e.target.getAttribute('name')](e, carouselImg, carouselDescription, data);
    }
  }, false);

  document.addEventListener("mouseover", function (e) {
    if (mouseHoverActions[e.target.getAttribute('name')]) {
      mouseHoverActions[e.target.getAttribute('name')](e);
    }
  }, false);

  document.addEventListener("mouseout", function (e) {
    if (mouseOutActions[e.target.getAttribute('name')]) {
      mouseOutActions[e.target.getAttribute('name')](e);
    }
  }, false);
}