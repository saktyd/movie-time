import axios from 'axios';
import {API_KEY, BASE_URL} from '../constans/api'

export const apiUrl = {
    fetchNowPlaying: `/movie/now_playing?api_key=${API_KEY}&language=en-us`,
    fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-us`,
    fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-us`,
    fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
    fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
    fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
    fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
    fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
    fetchSuggest: `/search/keyword?api_key=${API_KEY}`,
    fetchSearchMovie: `/search/movie?api_key=${API_KEY}`,
}

export const chooseUrl = (key) => {
    let url;
    switch (key) {
        case 'now-playing':
            url = apiUrl.fetchNowPlaying
            break;
        case 'all':
            url = apiUrl.fetchTrending
            break;
        case 'top-rated':
            url = apiUrl.fetchTopRated
            break;
        case 'actions':
            url = apiUrl.fetchActionMovies
            break;
        case 'comedy':
            url = apiUrl.fetchComedyMovies
            break;
        case 'horror':
            url = apiUrl.fetchHorrorMovies
            break;
        case 'romance':
            url = apiUrl.fetchRomanceMovies
            break;
        case 'documentaries':
            url = apiUrl.fetchDocumentaries
            break;
        case 'suggest':
            url = apiUrl.fetchSuggest
            break;
        case 'search':
            url = apiUrl.fetchSearchMovie
            break;
        default:
            url = ''
            break;
    }
    return url
}

export const request = axios.create({
    baseURL: BASE_URL
})