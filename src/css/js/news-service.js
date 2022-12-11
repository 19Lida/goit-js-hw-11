import axios from 'axios';
export default class NewsApiService {
  #BASE_URL = `https://pixabay.com/api/`;
  #KEY = '31952435-a6265c5ad36628f4c77481e76';
  constructor() {
    this.valueSearchQuery = '';
    this.page = 1;
  }
  async fetchImage() {
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
    return await axios.get(`${this.#BASE_URL}`, {
      params: {
        key: this.#KEY,
        g: this.valueSearchQuery,
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
  get ValueSearchQuery() {
    return this.valueSearchQuery;
  }
  set ValueSearchQuery(value) {
    this.valueSearchQuery = value;
  }
}
