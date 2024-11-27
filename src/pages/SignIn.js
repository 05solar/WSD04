// SignIn.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import '../styles/SignIn.css';

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [animating, setAnimating] = useState(false);
    const navigate = useNavigate(); 

    const toggleMode = () => {
        setAnimating(true);
        setTimeout(() => {
            setIsLogin(!isLogin);
            setAnimating(false);
        }, 500);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/home'); 
    };

    return (
        <div style={{ position: 'relative', width: '100%', height: '100vh', overflow: 'hidden' }}>
            {/* 배경 오버레이 */}
            <div
                className="background-overlay"
                style={{
                    backgroundImage: `url(${process.env.PUBLIC_URL}/starwars.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    position: 'fixed',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1,
                    filter: 'brightness(0.35)',
                }}
            ></div>

            {/* 애니메이션 링 컨테이너 */}
            <div className="aneis">
                <i style={{ '--clr': '#ED6A66' }}></i>
                <i style={{ '--clr': '#00239C' }}></i>
                <i style={{ '--clr': '#ffffff' }}></i>

                {/* 로그인 컨테이너 */}
                <div
                    className={`login-container ${animating ? 'animating' : ''} ${
                        isLogin ? 'login-mode' : 'signup-mode'
                    }`}
                    style={{
                        position: 'relative',
                        top: '0%',
                        left: '0%',
                        zIndex: 1,
                    }}
                >
                    {/* 기존 로그인 폼 내용 그대로 유지 */}
                    <h2>{isLogin ? '로그인' : '회원가입'}</h2>
                    <p className="subtitle">
                        {isLogin
                            ? '낫플릭스 사용자를 위한 로그인 페이지'
                            : '낫플릭스 사용자를 위한 회원가입 페이지'}
                    </p>

                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">{isLogin ? '이메일' : '이메일을 입력하시오'}</label>
                        <input type="text" id="email" placeholder="email@example.com" />

                        <label htmlFor="password">비밀번호</label>
                        <input type="password" id="password" placeholder="비밀번호 입력" />

                        {!isLogin && (
                            <>
                                <label htmlFor="confirm-password">비밀번호 확인</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="비밀번호 재입력"
                                />
                            </>
                        )}

                        {isLogin && (
                            <button
                                className="forgot-password"
                                onClick={(e) => {
                                    e.preventDefault();
                                    alert('>아직 구현하지 못한 기능입니다<');
                                }}
                                style={{ background: 'none', border: 'none' }} // 명확하게 배경 제거
                                >
                                    비밀번호를 잊으셨나요?
                                </button>

                        )}

                        <button className="login-btn" type="submit">
                            {isLogin ? '확인' : '회원가입 하기'}
                        </button>
                    </form>

                    <button className="signup-btn" onClick={toggleMode}>
                        {isLogin ? '계정이 없나요?' : '계정이 있습니다'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
