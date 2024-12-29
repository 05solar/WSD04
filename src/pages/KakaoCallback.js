// src/pages/KakaoCallback.js
import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const KakaoCallback = () => {
  const location = useLocation();
  const navigate = useNavigate(); 

  useEffect(() => {
    const query = new URLSearchParams(location.search);
    const code = query.get('code');

    if (code) {
      // 백엔드 서버로 인가 코드 전송
      axios.post('/api/kakao/callback', { code })
        .then(response => {
          const { accessToken, refreshToken, userInfo } = response.data;
          // 토큰 저장 및 사용자 정보 처리
          localStorage.setItem('access_token', accessToken);
          localStorage.setItem('refresh_token', refreshToken);
          // 필요 시 사용자 정보 저장
          toast.success('카카오 로그인 성공!');
          navigate('/home');
        })
        .catch(error => {
          console.error('카카오 토큰 교환 오류:', error);
          toast.error('카카오 로그인 실패!');
          navigate('/');
        });
    } else {
      toast.error('카카오 로그인에 필요한 코드가 없습니다.');
      navigate('/');
    }
  }, [location, navigate]);

  return (
    <div>
      <h2>로그인 중...</h2>
    </div>
  );
};

export default KakaoCallback;
