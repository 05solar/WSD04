import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SignIn from './pages/SignIn';

function App() {
    return (
        <Router>
            <Routes>
                {/* 기본 경로 ("/")에 SignIn 컴포넌트 매핑 */}
                <Route path="/" element={<SignIn />} />
                <Route path="/signin" element={<SignIn />} />
            </Routes>
        </Router>
    );
}

export default App;
