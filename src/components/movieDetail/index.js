import React, { useEffect, useState } from "react"
import { withRouter } from 'react-router'
import { getMovieDetail } from "../../api";

const MovieDetail = (props) => {
  const [movieId, setMovieId] = useState(-1)

  useEffect(() => {
    setMovieId(props.match.params)
    getMovieDetail({
      movieId: movieId,
    }).then((res) => {

    })
  }, [])

  return (
    <div className="movie-detail-wrapper">

    </div>
  )
}

export default withRouter(MovieDetail)