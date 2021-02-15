import React, { useEffect, useState } from "react"
import { withRouter } from 'react-router'
import { getMovieDetail } from "../../api"
import { getImgUrl } from "../../utils/img"
import LanguageCodes from '../../utils/languageCodes'
import './index.scss'

const MovieDetail = (props) => {
  const [backdropSrc, setBackdropSrc] = useState('')
  const [movieTitle, setMovieTitle] = useState('')
  const [overview, setOverview] = useState('')
  const [language, setLanguage] = useState('')
  const [genres, setGenres] = useState([])
  const [duration, setDuration] = useState('')

  useEffect(() => {
    getMovieDetail({
      movieId: props.match.params.movieId,
    }).then((res) => {
      const { data } = res
      console.log(data)
      setBackdropSrc(getImgUrl(data.backdrop_path))
      setMovieTitle(data.title)
      setOverview(data.overview)
      setLanguage(data.original_language)
      setGenres(data.genres)
      setDuration(data.runtime)
    })
  }, [])

  return (
    <div className="movie-detail-wrapper">
      <img className="movie-backdrop" src={backdropSrc} />
      <div className="movie-detail">
        <h1 className="movie-title">{ movieTitle }</h1>
        <div>
          <p>Duration: { duration } Minutes</p>
          <p>Language: { LanguageCodes[language] }</p>
          <p className="genres">
            Genres:
            {
              genres.map((genre, index) => {
                return (
                  <span className="genre" key={index}>{ genre.name }</span>
                )
              })
            }
          </p>
        </div>
        <p>{ overview }</p>
        <a className="btn" href="https://www.cathaycineplexes.com.sg/">Book Now</a>
      </div>
    </div>
  )
}

export default withRouter(MovieDetail)