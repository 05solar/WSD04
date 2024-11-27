/* PopularPage.js */
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PopularPage.css';

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState('tile'); // 'tile' or 'list'

  const navigate = useNavigate();

  useEffect(() => {
    // Fetching the movies
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&sort_by=popularity.desc&with_watch_providers=providers%253A8`,
          {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGFhMzI0ZTlkYjViYmRkNzM1NTdhMzk0MjY5MjU4MiIsIm5iZiI6MTczMjY5NDkxMS43MzE3MjcsInN1YiI6IjY3NDM1MDI0NjM3MGVjYWQzZjAwMDY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J8mYHb0oEpusJq71VOPNUHo2d-LyTNopStP9e5wWFmc'
            }
          }
        );
        // Limit to 5 movies initially
        setMovies(response.data.results.slice(0, 5));
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  // Toggle between tile and list view
  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'tile' ? 'list' : 'tile'));
  };

  return (
    <div className="popular-page">
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate('/home')}>NOTFLIX</h1>
        <ul className="menu">
          <li onClick={() => navigate('/home')}>홈</li>
          <li>대세 콘텐츠</li>
          <li onClick={() => navigate('/search')}>찾아보기</li>
          <li onClick={() => navigate('/like')}>내가찜한리스트</li>
        </ul>
      </div>
      <div className="content">
        <div
          className="view-toggle"
          data-mode={viewMode}
          onClick={toggleViewMode}
        >
          <div className="toggle-switch"></div>
          <div className="toggle-labels">
            <span>타일형</span>
            <span>리스트형</span>
          </div>
        </div>
        <div className={`movie-list ${viewMode}`}>
          {movies.map((movie) => (
            <div key={movie.id} className={`movie-card ${viewMode}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-rating">평점: {movie.vote_average}/10</p>
              </div>
              {/* Add overlay with additional movie details */}
              <div className="overlay">
                <p className="overview">{movie.overview}</p>
                <div className="vote-info">
                  <p>평점: {movie.vote_average}</p>
                  <p>투표수: {movie.vote_count}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PopularPage;
