import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const KakaoCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // URL에서 인가 코드 추출
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get('code');
    const error = urlParams.get('error');

    if (error) {
      toast.error('카카오 로그인에 실패했습니다.');
      navigate('/');
    } else if (code) {
      // 인가 코드를 백엔드로 전송하여 토큰 교환 및 사용자 정보 가져오기
      axios.post(`${process.env.REACT_APP_BACKEND_URL}/api/kakao/callback`, { code })
        .then(response => {
          // 백엔드에서 받은 사용자 정보 및 JWT 토큰 처리
          const { token, user } = response.data;
          localStorage.setItem('token', token);
          localStorage.setItem('user', JSON.stringify(user));
          toast.success('카카오 로그인에 성공했습니다.');
          navigate('/home');
        })
        .catch(err => {
          console.error(err);
          toast.error('카카오 로그인 처리 중 오류가 발생했습니다.');
          navigate('/');
        });
    }
  }, [navigate]);

  return (
    <div>
      <h2>로그인 처리 중...</h2>
    </div>
  );
};

export default KakaoCallback;
