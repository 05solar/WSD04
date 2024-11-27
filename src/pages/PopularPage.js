import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { throttle } from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom'; // useLocation 추가
import '../styles/PopularPage.css';

const PopularPage = () => {
  const [movies, setMovies] = useState([]);
  const [viewMode, setViewMode] = useState('tile'); // 'tile' 또는 'list'
  const [activeIndex, setActiveIndex] = useState(null);
  const [page, setPage] = useState(1); // 현재 페이지 번호
  const [hasMore, setHasMore] = useState(true); // 더 가져올 영화가 있는지 여부
  const [isLoading, setIsLoading] = useState(false); // 로딩 상태
  const [totalPages, setTotalPages] = useState(1); // 총 페이지 수

  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로를 확인하기 위한 useLocation 사용

  // 메뉴 아이템 배열 생성
  const menuItems = [
    { name: '홈', path: '/home', onClick: () => navigate('/home') },
    { name: '대세 컨텐츠', path: '/popular', onClick: () => navigate('/popular') },
    { name: '찾아보기', path: '/search', onClick: () => navigate('/search') },
    { name: '내가 찜한 리스트', path: '/like', onClick: () => navigate('/like') },
  ];

  // 현재 활성화된 메뉴의 인덱스 계산
  const activeMenuIndex = menuItems.findIndex((item) => item.path === location.pathname);

  useEffect(() => {
    fetchMovies(page);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, viewMode]);

  const fetchMovies = async (pageNum) => {
    if (isLoading || (viewMode === 'tile' && !hasMore)) return;

    setIsLoading(true);
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${pageNum}`,
        {
          headers: {
            accept: 'application/json',
            Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMGFhMzI0ZTlkYjViYmRkNzM1NTdhMzk0MjY5MjU4MiIsIm5iZiI6MTczMjY5NDkxMS43MzE3MjcsInN1YiI6IjY3NDM1MDI0NjM3MGVjYWQzZjAwMDY1MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.J8mYHb0oEpusJq71VOPNUHo2d-LyTNopStP9e5wWFmc'
          },
        }
      );
      setTotalPages(response.data.total_pages);

      if (viewMode === 'tile') {
        if (response.data.results.length === 0) {
          setHasMore(false);
        } else {
          setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
        }
      } else {
        setMovies(response.data.results);
      }
    } catch (error) {
      console.error('Failed to fetch movies', error);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleViewMode = () => {
    setViewMode((prevMode) => (prevMode === 'tile' ? 'list' : 'tile'));
    setActiveIndex(null);
    setPage(1);
    setMovies([]);
    setHasMore(true);
  };

  const handleCardClick = (index) => {
    setActiveIndex(index === activeIndex ? null : index);
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
    if (viewMode === 'tile') {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [viewMode, handleScroll]);

  const goToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePrevPage = () => {
    if (page > 1) setPage(page - 1);
  };

  const handleNextPage = () => {
    if (page < totalPages) setPage(page + 1);
  };

  return (
    <div className="popular-page">
      <div className="sidebar">
        <h1 className="logo" onClick={() => navigate('/home')}>
          NOTFLIX
        </h1>
        <ul className="menu">
          {menuItems.map((item, index) => (
            <li
              key={index}
              className={activeMenuIndex === index ? 'active' : ''}
              onClick={item.onClick}
            >
              {item.name}
            </li>
          ))}
        </ul>
      </div>
      <div className="content">
        <div className="view-toggle" data-mode={viewMode} onClick={toggleViewMode}>
          <div className="toggle-switch"></div>
          <div className="toggle-labels">
            <span>테이블 뷰</span>
            <span>무한 스크롤</span>
          </div>
        </div>
        {isLoading && movies.length === 0 ? (
          <div className="loading-center">로딩 중...</div>
        ) : viewMode === 'tile' ? (
          <div className="infinite-scroll-container">
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
            {isLoading && <div className="loading">Loading...</div>}
            {/* Top 버튼을 우측 상단에 배치 */}
            <button className="go-to-top" onClick={goToTop}>
              ▲
            </button>
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
            {/* 페이지네이션 */}
            <div className="pagination">
              <button onClick={handlePrevPage} disabled={page === 1}>
                이전
              </button>
              <span>{page}</span>
              <button onClick={handleNextPage} disabled={page === totalPages}>
                다음
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PopularPage;
