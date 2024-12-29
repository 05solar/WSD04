// index.js
const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

app.post('/api/kakao/callback', async (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).json({ message: 'Authorization code is missing.' });
  }

  try {
    // Access Token 발급
    const tokenResponse = await axios.post('https://kauth.kakao.com/oauth/token', null, {
      params: {
        grant_type: 'authorization_code',
        client_id: process.env.KAKAO_REST_API_KEY,
        redirect_uri: process.env.KAKAO_REDIRECT_URI,
        code: code,
        client_secret: process.env.CLIENT_SECRET, // 필요 시
      },
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    });

    const { access_token, refresh_token } = tokenResponse.data;

    // 사용자 정보 조회
    const userResponse = await axios.post('https://kapi.kakao.com/v2/user/me', null, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    const { properties, kakao_account } = userResponse.data;
    const nickname = properties.nickname;
    const email = kakao_account.email;

    // 사용자 정보 기반으로 JWT 발급 (여기서는 예시로 간단히)
    // 실제로는 사용자 정보를 데이터베이스에 저장하고 JWT를 발급해야 합니다.
    const jwtToken = 'your_jwt_token_here';

    res.json({
      accessToken: access_token,
      refreshToken: refresh_token,
      userInfo: {
        nickname,
        email,
      },
      jwtToken,
    });
  } catch (error) {
    console.error('Error during Kakao login:', error.response.data);
    res.status(500).json({ message: 'Kakao login failed.' });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
