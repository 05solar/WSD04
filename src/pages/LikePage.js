import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import '../styles/LikePage.css';

const LikePage = () => {
  const [likedMovies, setLikedMovies] = useState(() => {
    return JSON.parse(localStorage.getItem('likedMovies')) || [];
  });

  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 확인을 위한 useLocation 사용

  // 메뉴 아이템 배열 생성
  const menuItems = [
    { name: '홈', path: '/home', onClick: () => navigate('/home') },
    { name: '대세 콘텐츠', path: '/popular', onClick: () => navigate('/popular') },
    { name: '찾아보기', path: '/search', onClick: () => navigate('/search') },
    { name: '내가찜한리스트', path: '/like', onClick: () => navigate('/like') },
  ];

  // 현재 활성화된 메뉴의 인덱스 계산
  const activeIndex = menuItems.findIndex((item) => item.path === location.pathname);

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
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={activeIndex === index ? 'active' : ''}
              onClick={item.onClick}
            >
              {item.name}
            </li>
          ))}
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
