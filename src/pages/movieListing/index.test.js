import React from "react"
import {act, render, screen, waitForElementToBeRemoved, fireEvent, cleanup, waitFor} from "@testing-library/react"
import MovieListing from "./index"
import { BrowserRouter as Router } from "react-router-dom"

afterEach(cleanup)

describe('MovieListing', () => {
  it('renders without crashing', () => {
    render(<MovieListing/>)
  })

  it('renders movie listing correctly', async () => {
    await act(async () => {
      const { getAllByRole } = render(<Router><MovieListing/></Router>)
      await waitFor(() => getAllByRole('movie'))
      screen.debug()
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