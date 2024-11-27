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
        e.preventDefault(); // 기본 동작 방지
        navigate('/main'); // main 페이지로 이동
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
                    filter: 'brightness(0.2)',
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
                    <h2>{isLogin ? 'LOGIN' : 'SIGN UP'}</h2>
                    <p className="subtitle">
                        {isLogin
                            ? 'Login page for netflix demo'
                            : 'Create your account for netflix demo'}
                    </p>

                    {/* form에 onSubmit 연결 */}
                    <form onSubmit={handleLogin}>
                        <label htmlFor="email">{isLogin ? 'EMAIL' : 'ENTER YOUR EMAIL'}</label>
                        <input type="text" id="email" placeholder="Email" required />

                        <label htmlFor="password">PASSWORD</label>
                        <input type="password" id="password" placeholder="Password" required />

                        {!isLogin && (
                            <>
                                <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                                <input
                                    type="password"
                                    id="confirm-password"
                                    placeholder="Confirm Password"
                                    required
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
                            >
                                FORGOT YOUR PASSWORD?
                            </button>
                        )}

                        <button className="login-btn" type="submit">
                            LOGIN
                        </button>
                    </form>

                    <button className="signup-btn" onClick={toggleMode}>
                        {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SignIn;
