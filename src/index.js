import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';
import NewsApiService from './css/js/news-service';
import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  formEl: document.querySelector('.search-form'),
  inputEl: document.querySelector('.search-form__input'),
  buttonEl: document.querySelector('.search-form__button'),
  galleryEl: document.querySelector('.gallery'),
  buttonLoad: document.querySelector('.load-more'),
};
const newsApiService = new NewsApiService();
let totalPages = null;
refs.formEl.addEventListener('submit', onSubmit);
refs.buttonLoad.addEventListener('click', onLoadMore);
async function onSubmit(event) {
  event.preventDefault();
  newsApiService.form = event.currentTarget;
  newsApiService.valueSearchQuery =
    event.currentTarget.elements.searchQuery.value.trim();
  newsApiService.resetPage();
  refs.galleryEl.innerHTML = '';
  if (newsApiService.query === '') {
    Notify.failure('Please, fill the  field.');
    refs.buttonLoad.classList.add('is-hidden');
    return;
  }
  // якщо введено слово,то рендери розмітку на екран,очищай інпут і роби кнопку "завантажити ще" активною
  const {
    data: { hits, totalHits },
  } = await newsApiService.fetchImage();
  if (hits.length === 0) {
    Notify.failure(
      'Sorry, there are no images matching your search query. Please try again.'
    );
    refs.buttonLoad.classList.add('is-hidden');
    return;
  }
  renderCard(hits);
  Notify.success(`Hooray! We found ${totalHits} images.`);

  refs.buttonLoad.classList.remove('is-hidden');
  totalPages = Math.ceil(totalHits / 40);
  if (newsApiService.page === totalPages) {
    refs.buttonLoad.classList.add('is-hidden');
    Notify.failure(
      'We are sorry, but you have reached the end of search results'
    );
  }

  // .catch()
  // .finally(() => newsApiService.form.reset());
}

function renderCard(img) {
  refs.galleryEl.insertAdjacentHTML('beforeend', markupGallery(img));
}
function markupGallery(data) {
  return data
    .map(
      ({
        largeImageURL,
        tags,
        webformatURL,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `
<div class="thumb">
    <a href="${largeImageURL}"
            class="gallery__item" >
    <div class="photo-card">
            <img src="${webformatURL}" alt="${tags}" width="300" height="300" loading="lazy"
            class="gallery__image"/>
        <div class="info">
            <p class="info-item">
            <b>Likes </b>${likes}
            </p>
            <p class="info-item">
            <b>Views </b>${views}
            </p>
            <p class="info-item">
            <b>Comments </b>${comments}
            </p>
            <p class="info-item">
            <b>Downloads </b>${downloads}
            </p>
         </div>
    </div>
    </a>
</div>`;
      }
    )
    .join('');
}
async function onLoadMore() {
  // newsApiService.incrementPage();
  // newsApiService
  // const data = await newsApiService.fetchImage();
  try {
    newsApiService.incrementPage();
    const {
      data: { hits, totalHits },
      // console.log(totalHits);
      // renderCard(hits);
      // console.log(newsApiService.page);
      // console.log(totalPages);
    } = await newsApiService.fetchImage();
    renderCard(hits);
    // console.log(newsApiService.page);
    if (newsApiService.page === totalPages) {
      refs.buttonLoad.classList.add('is-hidden');
      Notify.failure(
        'We are sorry, but you have reached the end of search results'
      );
    }
    smoothScroll();
  } catch (error) {
    console.log(error);
  }
}

function smoothScroll() {
  const { height: cardHeight } =
    refs.galleryEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}
