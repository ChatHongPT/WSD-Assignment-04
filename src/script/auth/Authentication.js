// Vite의 환경 변수 시스템을 사용하여 카카오 REST API 키를 가져옵니다.
const TMDb_API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const KAKAO_REST_API_KEY = import.meta.env.VITE_KAKAO_REST_API_KEY;  // REST API 키

const tryLogin = (email, password, success, fail, saveToken = true) => {
    const users = JSON.parse(localStorage.getItem('users')) || [];

    const user = users.find(user => user.id === email && user.password === password);

    if (user) {
        if (saveToken) {
            // TMDb API 키를 로컬 스토리지에 저장 (데모용)
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

export { tryLogin, tryRegister, TMDb_API_KEY, KAKAO_REST_API_KEY };
