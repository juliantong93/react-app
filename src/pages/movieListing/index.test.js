import React from "react"
import {act, render, screen, waitForElementToBeRemoved, fireEvent, cleanup, waitFor} from "@testing-library/react"
import MovieListing from "./index"
import { BrowserRouter as Router } from "react-router-dom"
import * as ApiUtils from '../../api'

beforeEach(() => {
  ApiUtils.getMovieListing = jest.fn().mockResolvedValue({
    data: {
      results: [{
        adult: false,
        backdrop_path: "/ciFHOyVlaMV2N7T44JOsj6his7P.jpg",
        genre_ids: [18, 36, 10752],
        id: 11165,
        original_language: "en",
        original_title: "Sample Mocked Movie Title",
        overview: "In the summer of 1941, the United States and Japan seem on the brink of war after constant embargos and failed diplomacy come to no end. \"Tora! Tora! Tora!\", named after the code words use by the lead Japanese pilot to indicate they had surprised the Americans, covers the days leading up to the attack on Pearl Harbor, which plunged America into the Second World War.",
        popularity: 9.579,
        poster_path: "/4Clc1z1dfpfB6GNWRJH8QuKgE8u.jpg",
        release_date: "1970-01-26",
        title: "Sample Mocked Movie Title",
        video: false,
        vote_average: 7.1,
        vote_count: 333,
      }],
      total_results: 1,
    }
  })
})

afterEach(cleanup)

describe('MovieListing', () => {
  it('renders without crashing', async () => {
    await act(async () => {
      const { getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitFor(() => getAllByRole('movie'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })

  it('renders movie listing correctly', async () => {
    await act(async () => {
      const { getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitFor(() => getAllByRole('movie'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })

  it('sorts movie listing in ascending order', async () => {
    await act(async () => {
      const { getByText, getByTestId, getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitFor(() => getAllByRole('movie'))

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
      await waitFor(() => getAllByRole('movie'))

      fireEvent.change(getByTestId('sort_field_dropdown'), {
        target: {
          value: 1,
        },
      })

      await waitFor(() => getAllByRole('movie'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })

  it('sorts movie listing by rating', async () => {
    await act(async () => {
      const { getByTestId, getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitFor(() => getAllByRole('movie'))

      fireEvent.change(getByTestId('sort_field_dropdown'), {
        target: {
          value: 2,
        },
      })

      await waitFor(() => getAllByRole('movie'))
      expect(getAllByRole('movie').length).toBeGreaterThan(0)
    })
  })
})