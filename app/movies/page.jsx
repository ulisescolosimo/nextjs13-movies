'use client'

import React, { useEffect, useState } from 'react'
import MovieList from '../components/MovieList';

const api_key = "eae3401c25d6e61559d8ad2bdf741a33"

const Movies = () => {
  
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState([])
  const [topRated, setTopRated] = useState([])
  
  async function getAllMovies() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${api_key}&language=en-US&page=${page}`);
    return res.json();
  }

  async function getTopRated() {
    const res = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=eae3401c25d6e61559d8ad2bdf741a33&language=en-US&page=1`)
    return res.json()
  }

  useEffect(() => {
    (async()=> {
      setLoading(false)
      const data = await getAllMovies();
      const top = await getTopRated();
      setMovies(data?.results?.slice(0,18))
      setTopRated(top)
      setLoading(true)
    })()
  }, [page])

  
  return (
    <div>
      <MovieList movies={movies} setPage={setPage} page={page} loading={loading} topRated={topRated} />
    </div>
  )
}

export default Movies