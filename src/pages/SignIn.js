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
        <div
            className={`login-container ${animating ? 'animating' : ''} ${
                isLogin ? 'login-mode' : 'signup-mode'
            }`}
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
                <label htmlFor="email">EMAIL</label>
                <input
                    type="text"
                    id="email"
                    placeholder="Email"
                />

                <label htmlFor="password">PASSWORD</label>
                <input
                    type="password"
                    id="password"
                    placeholder="Password"
                />

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
                        onClick={() => alert('>아직 구현하지 못한 기능입니다<')}
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
    );
};

export default SignIn;
