import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getUpcomingMovies } from "../api/tmdb-api";
// import AddToFavoritesIcon from '../components/cardIcons/addToFavorites'
import AddToWatch from '../components/cardIcons/addToWatch'

const UpcomingMoviePage = (props) => {
  const [movies, setMovies] = useState([]);
//   const favorites = upcomingMovies.filter(m => m.favorite)
//   localStorage.setItem('favorites', JSON.stringify(favorites))

//   const addToFavorites = (movieId) => {
//     const updatedUpcomingMovies = upcomingMovies.map((m) =>
//       m.id === movieId ? { ...m, favorite: true } : m
//     );
//     setUpcomingMovies(updatedUpcomingMovies);
//   };

  useEffect(() => {
    getUpcomingMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Upcoming Movies'
      movies={movies}
      action={(movie) => {
        return <AddToWatch movie={movie} />
      }}
    //   selectFavorite={addToFavorites}
    />
  );
};
export default UpcomingMoviePage;