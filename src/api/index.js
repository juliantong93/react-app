import axios from "axios"
import { apiBaseUrl, apiKey } from "../config/baseUrl";

export const getMovieListing = function(params) {
  let url = `${apiBaseUrl}/3/discover/movie`
  return axios.get(url, {
    params: {
      'api_key': apiKey,
      'primary_release_date.lte': '2016-12-31',
      'sort_by': `${params.sortField}.${params.sortBy}`,
      'page': params.page,
    }
  }).catch(err => {
    console.log(`Error retrieving movie listing: ${url}`, err)
  })
}

export const getMovieDetail = function(params) {
  let url = `${apiBaseUrl}/3/movie/${params.movieId}`
  return axios.get(url, {
    params: {
      'api_key': apiKey,
    },
  }).catch(err => {
    console.log(`Error retrieving movie details: ${url}`, err)
  })
}
