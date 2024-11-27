// SearchPage.js
import React, { useState } from 'react';
import axios from 'axios';
import '../styles/SearchPage.css';

const SearchPage = () => {
  const [movies, setMovies] = useState([]);
  const [genre, setGenre] = useState('');
  const [rating, setRating] = useState('');
  const [language, setLanguage] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`, {
        params: {
          api_key: 'YOUR_TMDB_API_KEY',
          with_genres: genre,
          'vote_average.gte': rating,
          with_original_language: language,
        },
      });
      setMovies(response.data.results);
    } catch (error) {
      console.error('Failed to fetch movies', error);
    }
  };

  const handleReset = () => {
    setGenre('');
    setRating('');
    setLanguage('');
    setMovies([]);
  };

  return (
    <div className="search-page">
      <h1>찾아보기</h1>
      <div className="filters">
        <select value={genre} onChange={(e) => setGenre(e.target.value)}>
          <option value="">장르(전체)</option>
          <option value="28">액션</option>
          <option value="10749">로맨스</option>
          <option value="12">어드벤처</option>
          <option value="35">코미디</option>
          <option value="80">범죄</option>
          <option value="10751">가족</option>
        </select>
        <select value={rating} onChange={(e) => setRating(e.target.value)}>
          <option value="">평점(전체)</option>
          <option value="9">9-10</option>
          <option value="8">8-9</option>
          <option value="7">7-8</option>
          <option value="6">6-7</option>
          <option value="5">5-6</option>
          <option value="4">4-5</option>
          <option value="3">4점 이하</option>
        </select>
        <select value={language} onChange={(e) => setLanguage(e.target.value)}>
          <option value="">언어(전체)</option>
          <option value="en">영어</option>
          <option value="ko">한국어</option>
        </select>
        <button onClick={handleSearch}>검색</button>
        <button onClick={handleReset}>초기화</button>
      </div>
      <div className="movie-list">
        {movies.map((movie) => (
          <div key={movie.id} className="movie-card">
            <h3>{movie.title}</h3>
            <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
