import axios from 'axios';
export default class NewsApiService {
  #BASE_URL = `https://pixabay.com/api/`;
  #KEY = `31952435-a6265c5ad36628f4c77481e76`;
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }
  fetchImage() {
    // const BASE_URL = `https://pixabay.com/api/`;
    // const API_KEY = `31952435-a6265c5ad36628f4c77481e76`;
    // try {
    //   const response = await axios.get(
    //     `${BASE_URL}?key=${API_KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    //   );
    //   const data = response.data.hits;
    //   console.log(data);

    //   return response.data;
    // } catch (error) {
    //   console.error(error);
    // }
    return axios.get(`$(this.#BASE_URL)`, {
      params: {
        key: this.#KEY,
        g: this.searchQuery,
        image_type: 'photo',
        orientation: 'orientation',
        safesearch: true,
        per_page: 40,
        page: this.page,
      },
    });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }
  get searchQuery() {
    return this.searchQuery;
  }
  set searchQuery(value) {
    this.value.searchQuery = value;
  }
}
