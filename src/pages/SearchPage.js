import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [language, setLanguage] = useState('');

  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 확인하기 위한 useLocation 사용

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
      try {
        let allMovies = [];
        for (let page = 1; page <= 5; page++) {
          const response = await axios.get(
            `https://api.themoviedb.org/3/discover/movie?include_adult=true&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc&with_watch_providers=providers%253A8`,
            {
              headers: {
                accept: 'application/json',
                Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGFhMzI0ZTlkYjViYmRkNzM1NTdhMzk0MjY5MjU4MiIsIm5iZiI6MTczMjY5NDkxMS43MzE3MjcsInN1YiI6IjY3NDM1MDI0NjM3MGVjYWQzZjAwMDY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J8mYHb0oEpusJq71VOPNUHo2d-LyTNopStP9e5wWFmc'
              },
            }
          );
          allMovies = [...allMovies, ...response.data.results];
        }
        setMovies(allMovies.slice(0, 100));
        setFilteredMovies(allMovies.slice(0, 100));
      } catch (error) {
        console.error('Failed to fetch movies', error);
      }
    };

    fetchMovies();
  }, []);

  const handleFilter = () => {
    let updatedMovies = movies;
    if (genre) {
      updatedMovies = updatedMovies.filter((movie) => (genre === '성인' ? movie.adult : !movie.adult));
    }
    if (rating) {
      updatedMovies = updatedMovies.filter((movie) => {
        const avg = movie.vote_average;
        if (rating === '9-10') return avg >= 9 && avg <= 10;
        if (rating === '8-9') return avg >= 8 && avg < 9;
        if (rating === '7-8') return avg >= 7 && avg < 8;
        if (rating === '6-7') return avg >= 6 && avg < 7;
        if (rating === '5-6') return avg >= 5 && avg < 6;
        if (rating === '4-5') return avg >= 4 && avg < 5;
        if (rating === '4 이하') return avg < 4;
        return true;
      });
    }
    if (language) {
      updatedMovies = updatedMovies.filter((movie) =>
        language === '' ? true : movie.original_language === language
      );
    }
    setFilteredMovies(updatedMovies);
  };

  const resetFilters = () => {
    setGenre('');
    setRating('');
    setLanguage('');
    setFilteredMovies(movies);
  };

  return (
    <div className="search-page">
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
        <div className="filters">
          <select value={genre} onChange={(e) => setGenre(e.target.value)}>
            <option value="">장르(전체)</option>
            <option value="성인">성인</option>
            <option value="청소년관람가능">청소년관람가능</option>
          </select>
          <select value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value="">평점(전체)</option>
            <option value="9-10">9-10</option>
            <option value="8-9">8-9</option>
            <option value="7-8">7-8</option>
            <option value="6-7">6-7</option>
            <option value="5-6">5-6</option>
            <option value="4-5">4-5</option>
            <option value="4 이하">4 이하</option>
          </select>
          <select value={language} onChange={(e) => setLanguage(e.target.value)}>
            <option value="">언어(전체)</option>
            <option value="en">영어</option>
            <option value="ko">한국어</option>
          </select>
          <button onClick={handleFilter}>검색</button>
          <button onClick={resetFilters}>초기화</button>
        </div>
        <div className="movie-list">
          {filteredMovies.map((movie) => (
            <div key={movie.id} className="movie-card">
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                className="poster"
              />
              <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;
