// src/pages/SignIn.js
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs'; // 비밀번호 해시화를 위한 라이브러리
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import '../styles/SignIn.css';
import { loadKakaoSdk } from '../utils/loadKakaoSdk'; // 올바른 경로로 수정

const SignIn = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [animating, setAnimating] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [confirmPassword, setConfirmPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [termsAccepted, setTermsAccepted] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    // Remember me 기능 처리
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }

    // 로그인 상태 확인
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      navigate('/home');
    }

    // Kakao SDK 동적 로드 및 초기화
    loadKakaoSdk()
      .then((Kakao) => {
        if (!Kakao.isInitialized()) {
          Kakao.init(process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY);
          console.log('Kakao SDK Initialized:', Kakao.isInitialized());
        } else {
          console.log('Kakao SDK already initialized.');
        }
      })
      .catch((error) => {
        console.error('Kakao SDK 로딩 오류:', error);
        toast.error('카카오 SDK 로딩에 실패했습니다.');
      });
  }, [navigate]);

  const toggleMode = () => {
    setAnimating(true);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimating(false);
    }, 500);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    // 이메일 형식 검증
    if (!validateEmail(email)) {
      toast.error('유효한 이메일 주소를 입력하세요.');
      return;
    }
    // 로그인 로직
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const user = users.find((user) => user.email === email);
  
    if (user && bcrypt.compareSync(password, user.password)) {
      // 로그인 성공 처리
      toast.success('로그인 성공!');
      if (rememberMe) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }
      localStorage.setItem('isLoggedIn', 'true'); // 로그인 상태 설정
      navigate('/home');
    } else {
      toast.error('이메일 또는 비밀번호가 잘못되었습니다.');
    }
  };
  

  const handleSignUp = (e) => {
    e.preventDefault();
    // 이메일 형식 검증
    if (!validateEmail(email)) {
      toast.error('유효한 이메일 주소를 입력하세요.');
      return;
    }
    // 비밀번호 확인 검증
    if (password !== confirmPassword) {
      toast.error('비밀번호가 일치하지 않습니다.');
      return;
    }
    // 약관 동의 확인
    if (!termsAccepted) {
      toast.error('약관에 동의해야 합니다.');
      return;
    }
    // 기존 사용자 목록 가져오기
    const users = JSON.parse(localStorage.getItem('users')) || [];

    // 중복 이메일 확인
    const isExistingUser = users.some((user) => user.email === email);
    if (isExistingUser) {
      toast.error('이미 등록된 이메일입니다.');
      return;
    }

    // 비밀번호 해시화
    const salt = bcrypt.genSaltSync(10);
    const hashedPassword = bcrypt.hashSync(password, salt);

    // 새로운 사용자 추가
    const newUser = { email, password: hashedPassword };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    toast.success('회원가입 성공! 로그인 페이지로 이동합니다.');
    setIsLogin(true);
    setPassword('');
    setConfirmPassword('');
  };

  const handleKakaoLogin = () => {
    if (window.Kakao && window.Kakao.Auth) {
      window.Kakao.Auth.authorize({
        redirectUri: process.env.REACT_APP_KAKAO_REDIRECT_URI,
      });
    } else {
      toast.error('카카오 SDK가 초기화되지 않았습니다.');
      console.error('Kakao SDK is not initialized.');
    }
  };

  const validateEmail = (email) => {
    // 이메일 형식 검증 로직
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
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
          <h2>{isLogin ? '로그인' : '회원가입'}</h2>
          <p className="subtitle">
            {isLogin
              ? '낫플릭스 사용자를 위한 로그인 페이지'
              : '낫플릭스 사용자를 위한 회원가입 페이지'}
          </p>

          <form onSubmit={isLogin ? handleLogin : handleSignUp}>
            <label htmlFor="email">이메일</label>
            <input
              type="text"
              id="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="password">비밀번호</label>
            <input
              type="password"
              id="password"
              placeholder="비밀번호 입력"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {!isLogin && (
              <>
                <label htmlFor="confirm-password">비밀번호 확인</label>
                <input
                  type="password"
                  id="confirm-password"
                  placeholder="비밀번호 재입력"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />

                <div className="terms">
                  <input
                    type="checkbox"
                    id="terms"
                    checked={termsAccepted}
                    onChange={(e) => setTermsAccepted(e.target.checked)}
                  />
                  <label htmlFor="terms">약관에 동의합니다.</label>
                </div>
              </>
            )}

            {isLogin && (
              <>
                <div className="remember-me">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label htmlFor="rememberMe">아이디 저장 및 자동 로그인</label>
                </div>
                <button
                  className="forgot-password"
                  onClick={(e) => {
                    e.preventDefault();
                    alert('>아직 구현하지 못한 기능입니다<');
                  }}
                >
                  비밀번호를 잊으셨나요?
                </button>
              </>
            )}

            <button className="login-btn" type="submit">
              {isLogin ? '로그인' : '회원가입'}
            </button>
          </form>

          <button className="signup-btn" onClick={toggleMode}>
            {isLogin ? '계정이 없나요?' : '계정이 있습니다'}
          </button>

          {/* 카카오 로그인 버튼 */}
          <button className="kakao-login-btn" onClick={handleKakaoLogin}>
            카카오로 로그인
          </button>
        </div>
      </div>

      {/* ToastContainer 추가 */}
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
      />
    </div>
  );
};

export default SignIn;
