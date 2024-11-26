import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';
import MainPage from './pages/MainPage';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<SignIn />} />
                <Route path="/main" element={<MainPage />} />
            </Routes>
        </Router>
    );
};

export default App;
