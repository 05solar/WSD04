import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/PopularPage.css';

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState('tile'); 
  const [activeIndex, setActiveIndex] = useState(null); 

  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          'https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&sort_by=popularity.desc&with_watch_providers=providers%253A8',
          {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGFhMzI0ZTlkYjViYmRkNzM1NTdhMzk0MjY5MjU4MiIsIm5iZiI6MTczMjY5NDkxMS43MzE3MjcsInN1YiI6IjY3NDM1MDI0NjM3MGVjYWQzZjAwMDY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J8mYHb0oEpusJq71VOPNUHo2d-LyTNopStP9e5wWFmc'
            },
          }
        );
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'tile' ? 'list' : 'tile'));
    setActiveIndex(null); 
  };

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
  };

  return (
    <div className="popular-page">
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate('/home')}>
          NOTFLIX
        </h1>
        <ul className="menu">
          <li onClick={() => navigate('/home')}>홈</li>
          <li>대세 컨텐츠</li>
          <li onClick={() => navigate('/search')}>찾아보기</li>
          <li onClick={() => navigate('/like')}>내가 찜한 리스트</li>
        </ul>
      </div>
      <div className="content">
        <div className="view-toggle" data-mode={viewMode} onClick={toggleViewMode}>
          <div className="toggle-switch"></div>
          <div className="toggle-labels">
            <span>액자형</span>
            <span>타일형</span>
          </div>
        </div>
        {viewMode === 'tile' ? (
          <div className={`movie-list tile`}>
            {movies.map((movie) => (
              <div key={movie.id} className={`movie-card tile`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="poster"
                />
                <div className="movie-info">
                  <h3 className="movie-title">{movie.title}</h3>
                  <p className="movie-rating">별점: {movie.vote_average}/10</p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="list-view-container">
            <div className="general-container">
              {movies.slice(0, 5).map((movie, index) => (
                <div
                  key={movie.id}
                  className={`card-item ${
                    activeIndex === index ? 'card-item--active' : ''
                  }`}
                  style={{
                    '--backgroundImage': `url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                  }}
                  onClick={() => handleCardClick(index)}
                >
                  <div className="shadow-overlay"></div>
                  <div className="emoji-box">
                    <div className="titles-box">
                      <div className="titles-box--title">{movie.title}</div>
                      {activeIndex === index && (
                        <div className="movie-details">
                          <p>{movie.overview}</p>
                          <p>별점: {movie.vote_average}/10</p>
                          <p>별점 준 사람: {movie.vote_count}</p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPage;
