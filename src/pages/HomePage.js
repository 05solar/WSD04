/* HomePage.js */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { throttle } from 'lodash';
import { useNavigate } from 'react-router-dom';
import '../styles/HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [likedMovies, setLikedMovies] = useState(() => {
    return JSON.parse(localStorage.getItem('likedMovies')) || [];
  });

  const navigate = useNavigate(); // navigate 훅 추가

  useEffect(() => {
    const fetchMovies = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc&with_watch_providers=providers%253A8`, {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGFhMzI0ZTlkYjViYmRkNzM1NTdhMzk0MjY5MjU4MiIsIm5iZiI6MTczMjY5NDkxMS43MzE3MjcsInN1YiI6IjY3NDM1MDI0NjM3MGVjYWQzZjAwMDY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J8mYHb0oEpusJq71VOPNUHo2d-LyTNopStP9e5wWFmc'
          }
        });

        if (response.data.results.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        }
      } catch (error) {
        console.error('Failed to fetch movies', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchMovies();
  }, [page]);

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

  const handleScroll = throttle(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 200 &&
      !isLoading &&
      hasMore
    ) {
      setPage((prevPage) => prevPage + 1);
    }
  }, 200);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="home-page">
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate('/home')}>NOTFLIX</h1>
        <ul className="menu">
          <li onClick={() => navigate('/home')}>홈</li>
          <li onClick={() => navigate('/popular')}>대세 콘텐츠</li>
          <li onClick={() => navigate('/search')}>찾아보기</li>
          <li onClick={() => navigate('/like')}>내가찜한리스트</li>
        </ul>
      </div>
      <div className="content">
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster"
              />
              <h3 className="movie-title">{movie.title}</h3>
              <button className="like-button" onClick={() => toggleLike(movie)}>
                {likedMovies.some((m) => m.id === movie.id) ? '💖' : '🤍'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
