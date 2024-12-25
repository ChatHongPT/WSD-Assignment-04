import dotenv from 'dotenv';

// 환경 변수 로드
dotenv.config();

const TMDb_API_KEY = process.env.VITE_TMDB_API_KEY;
const KAKAO_JAVASCRIPT_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;

const tryLogin = (email, password, success, fail, saveToken = true) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.id === email && user.password === password);

    if (user) {
        if (saveToken) {
            // 환경 변수에 저장된 TMDb API 키를 로컬 스토리지에 저장 (데모용)
            localStorage.setItem('TMDb-Key', TMDb_API_KEY);
        }
        success(user);
    } else {
        fail();
    }
};

const tryRegister = (email, password, success, fail) => {
    try {
        const users = JSON.parse(localStorage.getItem('users')) || [];
        const userExists = users.some(existingUser => existingUser.id === email);

        if (userExists) {
            throw new Error('User already exists');
        }

        const newUser = { id: email, password: password };
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        success();
    } catch (err) {
        fail(err);
    }
};

export { tryLogin, tryRegister, TMDb_API_KEY, KAKAO_JAVASCRIPT_KEY };