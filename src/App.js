// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import HomePage from './pages/HomePage';
import PopularPage from './pages/PopularPage';
import SearchPage from './pages/SearchPage';
import LikePage from './pages/LikePage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/home" element={<HomePage />} />
                <Route path="/popular" element={<PopularPage />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/like" element={<LikePage />} />
            </Routes>
        </Router>
    );
};

export default App;