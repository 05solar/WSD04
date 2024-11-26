import React, { useState } from 'react';
import '../styles/SignIn.css'; // 스타일 파일 가져오기

const SignIn = () => {
    const [isLogin, setIsLogin] = useState(true); // 로그인/회원가입 상태 전환
    const [animating, setAnimating] = useState(false); // 애니메이션 상태 관리

    const toggleMode = () => {
        setAnimating(true);
        setTimeout(() => {
            setIsLogin(!isLogin);
            setAnimating(false);
        }, 500); // 애니메이션 지속 시간 (CSS와 동기화)
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
                    position: 'fixed', // 화면에 고정
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    zIndex: -1, // 컨테이너 뒤에 표시
                    filter: 'brightness(0.2)',
                }}
            ></div>

            {/* 로그인 컨테이너 */}
            <div
                className={`login-container ${animating ? 'animating' : ''} ${
                    isLogin ? 'login-mode' : 'signup-mode'
                }`}
                style={{
                    position: 'relative',
                    top: '20%',
                    left: '-1%',
                    zIndex: 1, // 배경보다 앞쪽에 위치
                }}
            >
                {/* 제목 */}
                <h2>{isLogin ? 'LOGIN' : 'SIGN UP'}</h2>
                <p className="subtitle">
                    {isLogin
                        ? 'Login page for netflix demo'
                        : 'Create your account for netflix demo'}
                </p>

                {/* 입력 필드 */}
                <form>
                    <label htmlFor="email">{isLogin ? 'EMAIL' : 'ENTER YOUR EMAIL'}</label>
                    <input type="text" id="email" placeholder="Email" />

                    <label htmlFor="password">PASSWORD</label>
                    <input type="password" id="password" placeholder="Password" />

                    {!isLogin && (
                        <>
                            <label htmlFor="confirm-password">CONFIRM PASSWORD</label>
                            <input
                                type="password"
                                id="confirm-password"
                                placeholder="Confirm Password"
                            />
                        </>
                    )}

                    {/* 비밀번호 찾기 */}
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

                    {/* 버튼 */}
                    <button className="login-btn" type="submit">
                        {isLogin ? 'LOGIN' : 'SIGN UP'}
                    </button>
                </form>

                {/* 전환 버튼 */}
                <button className="signup-btn" onClick={toggleMode}>
                    {isLogin ? 'Switch to Sign Up' : 'Switch to Login'}
                </button>
            </div>
        </div>
    );
};

export default SignIn;
