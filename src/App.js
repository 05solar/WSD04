import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';
import PopularPage from './pages/Popularpage';
import WishlistPage from './pages/WishlistPage';
import AboutPage from './pages/AboutPage';
import Home from './pages/Home';

const App = () => {
    return (
        <Router>
            <Routes>
                {/* 로그인 페이지 */}
                <Route path="/" element={<SignIn />} />
                
                {/* 홈 페이지 */}
                <Route path="/main" element={<Home />} />
                
                {/* 개별 메뉴 */}
                <Route path="/main/popular" element={<PopularPage />} />
                <Route path="/main/wishlist" element={<WishlistPage />} />
                <Route path="/main/about" element={<AboutPage />} />
            </Routes>
        </Router>
    );
};

export default App;
