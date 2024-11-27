// HomePage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [likedMovies, setLikedMovies] = useState(() => {
    return JSON.parse(localStorage.getItem('likedMovies')) || [];
  });

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
          params: {
            api_key: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGFhMzI0ZTlkYjViYmRkNzM1NTdhMzk0MjY5MjU4MiIsIm5iZiI6MTczMjY3ODkwMC44NTI0OTczLCJzdWIiOiI2NzQzNTAyNDYzNzBlY2FkM2YwMDA2NTMiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.lQk93HyHdAsF66XKuMx00SLGzm3mn6Hae1AD5V-f-5g', // 실제 API 키로 변경
            page: page,
          },
        });
        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };
    
    fetchMovies();
  }, [page]);

  const loadMoreMovies = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const toggleLike = (movie) => {
    let updatedLikedMovies;
    if (likedMovies.some((m) => m.id === movie.id)) {
      updatedLikedMovies = likedMovies.filter((m) => m.id !== movie.id);
    } else {
      updatedLikedMovies = [...likedMovies, movie];
    }
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
  };

  return (
    <div className="home-page">
      <h1>홈</h1>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            <button className="like-button" onClick={() => toggleLike(movie)}>
              {likedMovies.some((m) => m.id === movie.id) ? '💖' : '🤍'}
            </button>
          </div>
        ))}
      </div>
      <button onClick={loadMoreMovies}>더 보기</button>
    </div>
  );
};

export default HomePage;
