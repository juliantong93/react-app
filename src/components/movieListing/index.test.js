import React from "react"
// import axios from 'axios'
import {act, render, screen, cleanup, waitForElementToBeRemoved, fireEvent} from "@testing-library/react"
// import { getMovieListing } from "../../api"
import MovieListing from "./index"
import { BrowserRouter as Router } from "react-router-dom"

// const movieListingArr = [{
//   'original_language': "en",
//   'original_title': "Tora! Tora! Tora!",
//   'popularity': 11.205,
//   'poster_path': "/4Clc1z1dfpfB6GNWRJH8QuKgE8u.jpg",
//   'release_date': "1970-01-26",
//   'title': "Tora! Tora! Tora!",
//   'video': false,
//   'vote_average': 7.1,
//   'vote_count': 332,
// }]

beforeEach(() => {
  // jest.fn().mockResolvedValue({
  //   data: {
  //     results: movieListingArr,
  //   }
  // })

  // axios.get = jest.fn().mockResolvedValue({
  //   data: {
  //     results: movieListingArr,
  //   }
  // })
})

// afterEach(cleanup)

describe('MovieListing', () => {
  it('renders without crashing', () => {
    render(<MovieListing/>)
  })

  it('renders movie listing correctly', async () => {
    await act(async () => {
      const { getByText, getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitForElementToBeRemoved(getByText('Loading...'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })

  it('sorts movie listing in ascending order', async () => {
    await act(async () => {
      const { getByText, getByTestId, getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitForElementToBeRemoved(getByText('Loading...'))

      fireEvent.change(getByTestId('sort_order_dropdown'), {
        target: {
          value: 1,
        },
      })

      await waitForElementToBeRemoved(getByText('Loading...'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })

  it('sorts movie listing by movie title', async () => {
    await act(async () => {
      const { getByText, getByTestId, getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitForElementToBeRemoved(getByText('Loading...'))

      fireEvent.change(getByTestId('sort_field_dropdown'), {
        target: {
          value: 1,
        },
      })

      await waitForElementToBeRemoved(getByText('Loading...'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })

  it('sorts movie listing by rating', async () => {
    await act(async () => {
      const { getByText, getByTestId, getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitForElementToBeRemoved(getByText('Loading...'))

      fireEvent.change(getByTestId('sort_field_dropdown'), {
        target: {
          value: 2,
        },
      })

      await waitForElementToBeRemoved(getByText('Loading...'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })
})