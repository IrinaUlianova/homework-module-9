import galleryItems from './galleryitems';
const boxImageEl = document.querySelector('.js-gallery');
const closeBtn = document.querySelector('[data-action="close-lightbox"]');
const modalWindowEl = document.querySelector('.js-lightbox');
const modalWindowImgEl = document.querySelector('.lightbox__image');
// Создание и рендер разметки по массиву данных galleryItems из app.js и предоставленному шаблону.
const createImageGallery = array => {
  return array
    .map(({ preview }) => {
      return `
        <li class="gallery__item">
        <img class="gallery__image" src="${preview} ">
        </li>
        `;
    })
    .join('');
};

const cardsGallery = createImageGallery(galleryItems);

boxImageEl.insertAdjacentHTML('beforeend', cardsGallery);

// Реализация делегирования на галерее ul.js-gallery и получение url большого изображения.
boxImageEl.addEventListener('click', onCardsGalleryClick);
closeBtn.addEventListener('click', onCloseBtn);
// Открытие модального окна по клику на элементе галереи.
// Подмена значения атрибута src элемента img.lightbox__image.
function onCardsGalleryClick(event) {
  if (!event.target.classList.contains('gallery__image')) {
    return;
  }
  modalWindowEl.classList.add('is-open');

  const findImgHref = array => {
    return array
      .map(item => {
        if (item.preview === event.target.src) {
          return item.original;
        }
      })
      .join('');
  };
  modalWindowImgEl.setAttribute('src', findImgHref(galleryItems));
}
// Закрытие модального окна по клику на кнопку button[data-action="close-lightbox"].
function onCloseBtn(event) {
  modalWindowImgEl.setAttribute('src', '');
  modalWindowEl.classList.remove('is-open');
}
