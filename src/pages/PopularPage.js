// PopularPage.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import '../styles/PopularPage.css';

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [viewType, setViewType] = useState('box');

  useEffect(() => {
    const fetchPopularMovies = async () => {
      try {
        const response = await axios.get(`https://api.themoviedb.org/3/movie/popular`, {
          params: {
            api_key: 'YOUR_TMDB_API_KEY',
            page: 1,
          },
        });
        setMovies(response.data.results);
      } catch (error) {
        console.error('Failed to fetch popular movies', error);
      }
    };
    // 5페이지의 데이터를 가져옴
    for (let i = 1; i <= 5; i++) {
      fetchPopularMovies(i);
    }
  }, []);

  return (
    <div className="popular-page">
      <h1>대세 콘텐츠</h1>
      <button onClick={() => setViewType(viewType === 'box' ? 'list' : 'box')}>
        {viewType === 'box' ? '리스트 보기' : '박스 보기'}
      </button>
      <div className={`movie-list ${viewType}`}>
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

export default PopularPage;