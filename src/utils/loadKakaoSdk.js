// src/utils/loadKakaoSdk.js
export const loadKakaoSdk = () => {
  return new Promise((resolve, reject) => {
    // 이미 Kakao SDK가 로드되어 있는지 확인
    if (window.Kakao) {
      console.log('Kakao SDK already loaded.');
      resolve(window.Kakao);
      return;
    }

    console.log('Loading Kakao SDK...');
    // Kakao SDK 스크립트 추가
    const script = document.createElement('script');
    script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
    script.async = true;
    script.onload = () => {
      if (window.Kakao) {
        console.log('Kakao SDK loaded successfully.');
        resolve(window.Kakao);
      } else {
        console.error('Kakao SDK failed to load.');
        reject(new Error('Kakao SDK 로딩 실패'));
      }
    };
    script.onerror = () => {
      console.error('Error loading Kakao SDK script.');
      reject(new Error('Kakao SDK 로딩 오류'));
    };
    document.body.appendChild(script);
  });
};
