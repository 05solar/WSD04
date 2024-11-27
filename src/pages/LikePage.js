import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LikePage.css';

const LikePage = () => {
  const [likedMovies, setLikedMovies] = useState(() => {
    return JSON.parse(localStorage.getItem('likedMovies')) || [];
  });

  const navigate = useNavigate();

  const removeLike = (movie) => {
    const updatedLikedMovies = likedMovies.filter((m) => m.id !== movie.id);
    setLikedMovies(updatedLikedMovies);
    localStorage.setItem('likedMovies', JSON.stringify(updatedLikedMovies));
  };

  return (
    <div className="like-page">
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate('/home')}>
          NOTFLIX
        </h1>
        <ul className="menu">
          <li onClick={() => navigate('/home')}>홈</li>
          <li onClick={() => navigate('/popular')}>대세 콘텐츠</li>
          <li onClick={() => navigate('/search')}>찾아보기</li>
          <li onClick={() => navigate('/like')}>내가찜한리스트</li>
        </ul>
      </div>
      <div className="content">
        <h2>내가 찜한 리스트</h2>
        <div className="movie-list">
          {likedMovies.length > 0 ? (
            likedMovies.map((movie) => (
              <div key={movie.id} className="movie-card">
                <button className="like-button" onClick={() => removeLike(movie)}>
                  💔
                </button>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="poster"
                />
                <h3 className="movie-title">{movie.title}</h3>
                {/* 호버 시 나타나는 오버레이 */}
                <div className="overlay">
                  <p className="movie-overview">{movie.overview}</p>
                  <p className="movie-rating">평점: {movie.vote_average}/10</p>
                </div>
              </div>
            ))
          ) : (
            <p>찜한 영화가 없습니다.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default LikePage;
