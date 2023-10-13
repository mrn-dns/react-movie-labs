// import React, { useState, useEffect } from "react";  
// import Header from "../components/headerMovieList";
// import FilterCard from "../components/filterMoviesCard";
// import MovieList from "../components/movieList";
// import Grid from "@mui/material/Grid";

// const MovieListPage = (props) => {
//   const [movies, setMovies] = useState([]);
//   const [nameFilter, setNameFilter] = useState("");
//   const [genreFilter, setGenreFilter] = useState("0");

//   const genreId = Number(genreFilter);

//   let displayedMovies = movies
//     .filter((m) => {
//       return m.title.toLowerCase().search(nameFilter.toLowerCase()) !== -1;
//     })
//     .filter((m) => {
//       return genreId > 0 ? m.genre_ids.includes(genreId) : true;
//     });

//     const handleChange = (e, type, value) => {
//       e.preventDefault()
//       props.onUserInput(type, value)   // NEW
//     }

//     const addToFavorites = (movieId) => {
//       const updatedMovies = movies.map((m) =>
//         m.id === movieId ? { ...m, favorite: true } : m
//       );
//       setMovies(updatedMovies);
//     };

//   useEffect(() => {
//     fetch(
//       `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.REACT_APP_TMDB_KEY}&language=en-US&include_adult=false&page=1`
//     )
//       .then((res) => res.json())
//       .then((json) => {
//         // console.log(json);
//         return json.results;
//       })
//       .then((movies) => {
//         setMovies(movies);
//       });
//   }, []);

//   return (
//     <Grid container sx={{ padding: "20px" }}>
//       <Grid item xs={12}>
//         <Header title={"Home Page"} />
//       </Grid>
//       <Grid item container spacing={5}>
//         <Grid key="find" item xs={12} sm={6} md={4} lg={3} xl={2}>
//         <FilterCard
//       onUserInput={handleChange}
//       titleFilter={nameFilter}
//       genreFilter={genreFilter}
//     />
//         </Grid>
//         <MovieList movies={displayedMovies} selectFavorite={addToFavorites} />
//       </Grid>
//     </Grid>
//   );
// };
// export default MovieListPage;

import React, { useState, useEffect } from "react";
import PageTemplate from '../components/templateMovieListPage'
import { getMovies } from "../api/tmdb-api";

const HomePage = (props) => {
  const [movies, setMovies] = useState([]);
  const favorites = movies.filter(m => m.favorite)
  localStorage.setItem('favorites', JSON.stringify(favorites))

  const addToFavorites = (movieId) => {
    const updatedMovies = movies.map((m) =>
      m.id === movieId ? { ...m, favorite: true } : m
    );
    setMovies(updatedMovies);
  };

  useEffect(() => {
    getMovies().then(movies => {
      setMovies(movies);
    });
  }, []);

  return (
    <PageTemplate
      title='Discover Movies'
      movies={movies}
      selectFavorite={addToFavorites}
    />
  );
};
export default HomePage;