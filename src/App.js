// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import SearchPage from './pages/SearchPage';
import LikePage from './pages/LikePage';
import KakaoCallback from './pages/KakaoCallback';
import ProtectedRoute from './pages/ProtectedRoute'; // ProtectedRoute 임포트

const App = () => {
  return (
    <Router>
      <Routes>
        {/* 로그인 페이지 */}
        <Route path="/" element={<SignIn />} />

        {/* 카카오 로그인 콜백 페이지 */}
        <Route path="/kakao/callback" element={<KakaoCallback />} />

        {/* 보호된 라우트들 */}
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <HomePage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/popular"
          element={
            <ProtectedRoute>
              <PopularPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/search"
          element={
            <ProtectedRoute>
              <SearchPage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/like"
          element={
            <ProtectedRoute>
              <LikePage />
            </ProtectedRoute>
          }
        />

        {/* 존재하지 않는 경로 처리 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

export default App;
