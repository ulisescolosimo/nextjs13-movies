import React, { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import ScrollToTop from "react-scroll-to-top";
import Link from "next/link";

const MovieList = ({ movies, setPage, page, topRated }) => {

  const [search, setSearch] = useState('')
  const [searchedMovies, setSearchedMovies] = useState([])
  const [searchPage, setSearchPage] = useState(1)

  async function searchMovie() {
    const res = await fetch(`https://api.themoviedb.org/3/search/movie?api_key=eae3401c25d6e61559d8ad2bdf741a33&language=en-US&query=${search}&page=${searchPage}&include_adult=false`)
    return res.json()
  }

  useEffect(()=> {
    (async()=> {
      const res = await searchMovie()
      setSearchedMovies(res.results)
    })()
  }, [searchPage, search])

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex my-10 gap-5 justify-center">
        <div className="flex flex-wrap gap-5 justify-evenly w-full flex-2">
          { searchedMovies?.length < 1 && search != null ? <section className="rounded-lg flex items-center h-full sm:p-16 dark:bg-gray-800 dark:text-gray-100">
	<div className="container flex flex-col items-center justify-center px-5 mx-auto my-8 space-y-8 text-center sm:max-w-md">
		<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="w-40 h-40 dark:text-gray-600">
			<path fill="currentColor" d="M256,16C123.452,16,16,123.452,16,256S123.452,496,256,496,496,388.548,496,256,388.548,16,256,16ZM403.078,403.078a207.253,207.253,0,1,1,44.589-66.125A207.332,207.332,0,0,1,403.078,403.078Z"></path>
			<rect width="176" height="32" x="168" y="320" fill="currentColor"></rect>
			<polygon fill="currentColor" points="210.63 228.042 186.588 206.671 207.958 182.63 184.042 161.37 162.671 185.412 138.63 164.042 117.37 187.958 141.412 209.329 120.042 233.37 143.958 254.63 165.329 230.588 189.37 251.958 210.63 228.042"></polygon>
			<polygon fill="currentColor" points="383.958 182.63 360.042 161.37 338.671 185.412 314.63 164.042 293.37 187.958 317.412 209.329 296.042 233.37 319.958 254.63 341.329 230.588 365.37 251.958 386.63 228.042 362.588 206.671 383.958 182.63"></polygon>
		</svg>
		<p className="text-3xl">Try another search, movies not found</p>
	</div>
</section> :
        (searchedMovies ? searchedMovies?.slice(0,15) : movies?.slice(0,15)).map((item) => <MovieCard movie={item} />)
      }
        </div>
        <div className="hidden right-0 py-2  md:hidden lg:block">
        <fieldset className="w-full space-y-1 dark:text-gray-100 mb-5">
	<label for="Search" className="hidden">Search</label>
	<div className="relative">
		<span className="absolute inset-y-0 left-0 flex items-center pl-2">
			<button type="button" title="search" className="p-1 focus:outline-none focus:ring">
				<svg fill="currentColor" viewBox="0 0 512 512" className="w-4 h-4 dark:text-gray-100">
					<path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
				</svg>
			</button>
		</span>
		<input type="search" onChange={(e)=> setSearch(e.target.value)} name="Search" placeholder="Search..." className="w-32 py-2 pl-10 text-sm rounded-md sm:w-auto focus:outline-none dark:bg-gray-800 dark:text-gray-100 focus:dark:bg-gray-900 focus:dark:border-violet-400" />
	</div>
</fieldset>
          <div className="mb-3 space-x-5 border-b-2 border-opacity-10 dark:border-violet-400">
            <button
              type="button"
              className="pb-3 font-bold uppercase text-xl dark:border-violet-400"
            >
              GOAT
            </button>
          </div>
          <div className="flex flex-col divide-y divide-gray-700">
            {topRated?.results?.slice(0,6).map((movie) => 
              <div className="flex px-1 py-4">
              <img
                alt=""
                className="flex-shrink-0 object-fit w-24 h-30 mr-4 dark:bg-gray-500"
                src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`}
              />
              <div className="flex flex-col flex-grow">
                <a
                  rel="noopener noreferrer"
                  href="#"
                  className="font-serif hover:underline text-lg"
                >
                  {movie.title}
                </a>
                <p className="text-xs dark:text-gray-400">
                  {movie.release_date}
                  <a
                    rel="noopener noreferrer"
                    href="#"
                    className="block dark:text-blue-400 lg:ml-2 lg:inline hover:underline"
                  >
                    {movie.vote_average}
                  </a>
                </p>
              </div>
            </div>
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-evenly gap-1 dark:text-gray-100">
        <button
          title="previous"
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800"
          onClick={() => {
            if(search?.length > 0 && searchedMovies?.length > 0) {
              if(searchPage > 1){
                setSearchPage(searchPage - 1)
              }
            } else {
              if (page > 1) {
                setPage(page - 1);
              }
            }
          }}
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>
        <button className="flex justify-center items-center bg-black">
          <ScrollToTop
            className="bg-black flex justify-center items-center font-bold p-2"
            width={"29"}
            height={"29"}
            smooth
          />
        </button>
        <button
          type="button"
          title="Page 1"
          className="inline-flex items-center justify-center w-8 h-8 text-sm font-semibold border rounded shadow-md dark:bg-gray-900 dark:text-yellow-500 dark:border-yellow-500"
          svgPath='<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up" viewBox="0 0 16 16">
          <path fill-rule="evenodd" d="M8 15a.5.5 0 0 0 .5-.5V2.707l3.146 3.147a.5.5 0 0 0 .708-.708l-4-4a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L7.5 2.707V14.5a.5.5 0 0 0 .5.5z"/>
        </svg>'
        >
          {page}
        </button>
        <button
          title="next"
          type="button"
          className="inline-flex items-center justify-center w-8 h-8 py-0 border rounded-md shadow-md dark:bg-gray-900 dark:border-gray-800"
          onClick={() => {
            if(search.length > 0 && searchedMovies.length > 0) {
              setSearchPage(searchPage + 1)
            } else {
              setPage( page + 1)
            }
          }}
        >
          <svg
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-4"
          >
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </div>
  );
};

export default MovieList;
