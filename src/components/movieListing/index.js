import React, { useState, useEffect } from "react"
import './index.scss'
import { getMovieListing } from '../../api'
import { getImgUrl } from "../../utils/img"
import { Link } from "react-router-dom"
import InfiniteScroll from 'react-infinite-scroll-component'

const MovieListing = props => {
  const [movies, setMovies] = useState([])
  const [currentPage, setPage] = useState(1)
  const [totalRecords, setTotalRecords] = useState(1)
  const [sorting, setSorting] = useState('desc')
  const [sortField, setSortField] = useState('release_date')
  const [hasMore, setHasMore] = useState(true)

  const fetchMore = () => {
    if (movies.length >= totalRecords) {
      setHasMore(false)
      return
    }

    console.log('page: ', currentPage)
    getMovieListing({
      sortField: sortField,
      sortBy: sorting,
      page: currentPage,
    }).then((res) => {
      setMovies([ ...movies, ...res.data.results ])
      setTotalRecords(res.data.total_results)
    })
  }

  useEffect(() => {
    fetchMore()
  }, [sorting, sortField, currentPage])

  const updSortBy = (e) => {
    const value = e.target.value
    let str = ''
    switch (value) {
      case '0':
        str = 'release_date'
        break;
      case '1':
        str = 'title'
        break;
      case '2':
        str = 'popularity'
        break;
      default:
        break;
    }
    setMovies([])
    setSortField(str)
    setPage(1)
  }

  const updSorting = (e) => {
    const value = e.target.value
    let str = ''
    switch (value) {
      case '0':
        str = 'desc'
        break;
      case '1':
        str = 'asc'
        break;
      default:
        break;
    }
    setMovies([])
    setSorting(str)
    setPage(1)
  }

  const getNextPage = () => {
    setPage(currentPage + 1)
  }

  const refresh = () => {
    setMovies([])
    currentPage === 1 ? fetchMore() : setPage(1)
  }

  return (
    <div className="movie-listing-wrapper">
      <div className="movie-listing-header">
        <h1>New Releases</h1>
      </div>
      <div className="toolbox">
        <label htmlFor="sort_field">Sort </label>
        <select id="sort_field" defaultValue="0" onChange={updSortBy}>
          <option value="0">Release Date</option>
          <option value="1">Movie Title</option>
          <option value="2">Rating</option>
        </select>
        <select id="sorting_dropdown" defaultValue="0" onChange={updSorting}>
          <option value="0">Descending</option>
          <option value="1">Ascending</option>
        </select>
      </div>
      <InfiniteScroll
        className="movie-listing"
        dataLength={movies.length}
        next={getNextPage}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={
          <p style={{ textAlign: "center" }}>
            <b>End of Movie List</b>
          </p>
        }
        refreshFunction={refresh}
        pullDownToRefresh
        pullDownToRefreshThreshold={50}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8595; Pull down to refresh</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: 'center' }}>&#8593; Release to refresh</h3>
        }
      >
        {
          movies.map((movie, index) => {
            const { title, popularity, poster_path } = movie
            return (
              <Link className="movie" to={ `/movie/${movie.id}` } key={index}>
                <div className="popularity">{ popularity.toFixed(1) }</div>
                <img className="poster" src={ getImgUrl(500, poster_path) } alt={ movie.title } />
                <h5 className="movie-title">{ title }</h5>
              </Link>
            )
          })
        }
      </InfiniteScroll>
    </div>
  )
}

export default MovieListing;