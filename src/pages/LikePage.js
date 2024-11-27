// LikePage.js
import React from 'react';
import '../styles/LikePage.css';

const LikePage = () => {
  const likedMovies = JSON.parse(localStorage.getItem('likedMovies')) || [];

  return (
    <div className="like-page">
      <h1>내가 찜한 리스트</h1>
      <div className="movie-list">
        {likedMovies.length === 0 ? (
          <p>찜한 영화가 없습니다.</p>
        ) : (
          likedMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <h3>{movie.title}</h3>
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default LikePage;