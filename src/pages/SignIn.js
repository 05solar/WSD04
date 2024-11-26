import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import RegisterForm from '../components/RegisterForm';

const SignInPage = () => {
    const [isLogin, setIsLogin] = useState(true);

    return (
        <div>
            <h1>{isLogin ? '로그인' : '회원가입'}</h1>
            {isLogin ? (
                <LoginForm switchMode={() => setIsLogin(false)} />
            ) : (
                <RegisterForm switchMode={() => setIsLogin(true)} />
            )}
        </div>
    );
};

export default SignInPage;
