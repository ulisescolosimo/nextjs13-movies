import React from 'react'
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { AiOutlineShoppingCart } from 'react-icons/ai';



const MovieCard = ({movie}) => {
  return (
    <div key={movie.id} className="max-w-xs rounded-md h-auto shadow-md dark:bg-gray-900 dark:text-gray-100">
	<img src={`http://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.id} className="object-contain object-center w-full rounded-t-md dark:bg-gray-800" />
	<div className="flex flex-col justify-between p-6 space-y-6">
		<div className="space-y-2">
			<h2 className="text-3xl font-semibold tracking-wide">{movie.title}</h2>
			<p className="dark:text-gray-100">{movie.overview.slice(0, 150)+'...'}</p>
		</div>
		<button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-yellow-500 dark:text-gray-900">Read more</button>
		<div className="flex justify-center items-center gap-2">
		<button type="button" className="flex items-center justify-center w-auto p-3 font-semibold tracking-wide rounded-md dark:bg-yellow-500 dark:text-gray-900"><AiOutlineShoppingCart /></button>
		<button type="button" className="flex items-center justify-center w-full p-3 font-semibold tracking-wide rounded-md dark:bg-yellow-500 dark:text-gray-900"><MdOutlineFavoriteBorder /></button>
		</div>
	</div>
</div>
  )
}

export default MovieCard