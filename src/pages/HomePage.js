import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { throttle } from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import '../styles/HomePage.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
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

  useEffect(() => {
    const fetchMovies = async () => {
      if (isLoading || !hasMore) return;

      setIsLoading(true);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc&with_watch_providers=providers%253A8`,
          {
            headers: {
              accept: 'application/json',
              Authorization: 'Bearer YOUR_API_KEY_HERE', // 실제 API 키로 교체 필요
            },
          }
        );

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
  }, [handleScroll]);

  return (
    <div className="home-page">
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
        <div className="movie-list">
          {movies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <button className="like-button" onClick={() => toggleLike(movie)}>
                {likedMovies.some((m) => m.id === movie.id) ? '💖' : '🤍'}
              </button>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster"
              />
              <h3 className="movie-title">{movie.title}</h3>
              <div className="overlay">
                <p className="movie-overview">{movie.overview}</p>
                <p className="movie-rating">평점: {movie.vote_average}/10</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
