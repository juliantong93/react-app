import React from "react"
import MovieListing from "./index"
import {act, render, screen} from "@testing-library/react"
import { getMovieListing } from "../../api"

jest.mock('../../api')

describe('MovieListing', () => {
  it('renders without crashing', () => {
    render(<MovieListing/>)
  })

  it('renders movie listing correctly', async () => {
    const movies = {
      data: [{
        popularity: 14.698,
        title: "Tora! Tora! Tora!",
        poster_path: "/4Clc1z1dfpfB6GNWRJH8QuKgE8u.jpg",
      }]
    };
    getMovieListing.mockResolvedValue(movies)
    const { container } = await act(async () => {
      render(<MovieListing/>)
    })
    console.log(container.querySelectorAll('.movie'))
    // expect(container.querySelector('.movie').length).toBeGreaterThan(0)
  })
})