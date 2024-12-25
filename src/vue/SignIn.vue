<template>
  <div class="signin-container">
    <div class="wrapper" :class="{ active: isSignUpMode }">
      <div class="bg-animate"></div>
      <div class="bg-animate2"></div>

      <!-- 로그인 폼 -->
      <div class="form-box login">
        <h2 class="animation" style="--data:0;">Login</h2>
        <form @submit.prevent="handleSignIn">
          <div class="input-box animation" style="--data:1;">
            <input
              type="text"
              v-model="loginForm.username"
              required
              placeholder=" "
            />
            <label>Username</label>
            <i class="fas fa-user"></i>
          </div>
          <div class="input-box animation" style="--data:2;">
            <input
              type="password"
              v-model="loginForm.password"
              required
              placeholder=" "
            />
            <label>Password</label>
            <i class="fas fa-lock"></i>
          </div>
          <button type="submit" class="btn animation" style="--data:3;">
            Login
          </button>
          <div class="reg-link animation" style="--data:4;">
            <p>
              Don't have an account?
              <a href="#" @click.prevent="toggleMode">Sign Up</a>
            </p>
          </div>
        </form>

        <!-- 카카오 로그인 버튼 (추가) -->
        <div class="social-login-area animation" style="--data:5; margin-top: 10px;">
          <button type="button" class="btn kakao-btn" @click="loginWithKakao">
            카카오로 로그인
          </button>
        </div>
      </div>

      <!-- 회원가입 폼 -->
      <div class="form-box signup">
        <h2 class="animation">Sign Up</h2>
        <form @submit.prevent="handleSignUp">
          <div class="input-box animation" style="--data:17;">
            <input
              type="text"
              v-model="signupForm.username"
              required
              placeholder=" "
            />
            <label>Username</label>
            <i class="fas fa-user"></i>
          </div>
          <div class="input-box animation" style="--data:18;">
            <input
              type="email"
              v-model="signupForm.email"
              required
              placeholder=" "
            />
            <label>Email</label>
            <i class="fas fa-envelope"></i>
          </div>
          <div class="input-box animation" style="--data:19;">
            <input
              type="password"
              v-model="signupForm.password"
              required
              placeholder=" "
            />
            <label>Password</label>
            <i class="fas fa-lock"></i>
          </div>
          <button type="submit" class="btn animation" style="--data:20;">
            Sign Up
          </button>
          <div class="reg-link animation" style="--data:21;">
            <p>
              Already have an account?
              <a href="#" @click.prevent="toggleMode">Login</a>
            </p>
          </div>
        </form>
      </div>

      <!-- 로그인 정보 텍스트 -->
      <div class="info-text login">
        <h2 class="animation" style="--data:0;">Welcome Back!</h2>
        <p class="animation" style="--data:1;">Continue your journey with us</p>
      </div>

      <!-- 회원가입 정보 텍스트 -->
      <div class="info-text signup">
        <h2 class="animation" style="--data:22;">Hello, Friend!</h2>
        <p class="animation" style="--data:23;">Join us for an amazing experience</p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import { useRouter } from 'vue-router';
import { tmdbApi } from '../../services/tmdb';

// 카카오 SDK를 사용하기 위한 선언
declare global {
  interface Window {
    Kakao: any;
  }
}

const router = useRouter();
const isSignUpMode = ref(false);

/** ===============================
 *   기존 TMDB 로그인 로직
 * =============================== */
const loginForm = reactive({
  username: '',
  password: '' // TMDB API 키 (2차 과제 로직)
});

const signupForm = reactive({
  username: '',
  email: '',
  password: '' // TMDB API 키
});

// 로컬스토리지에서 사용자 목록 가져오기
const getUsers = () => {
  const users = localStorage.getItem('users');
  return users ? JSON.parse(users) : [];
};
const saveUsers = (users: any[]) => {
  localStorage.setItem('users', JSON.stringify(users));
};

// 기존 로그인 핸들러
const handleSignIn = async () => {
  try {
    const users = getUsers();
    const user = users.find(
      (u: any) =>
        u.username === loginForm.username && u.apiKey === loginForm.password
    );

    if (!user) {
      alert('아이디 또는 비밀번호가 올바르지 않습니다.');
      return;
    }

    await tmdbApi.validateApiKey(loginForm.password);

    localStorage.setItem('TMDb-Key', loginForm.password);
    localStorage.setItem('userId', loginForm.username);
    localStorage.setItem('isAuthenticated', 'true');

    window.location.href = './'; // 메인페이지 이동
  } catch (error) {
    alert('잘못된 API 키입니다. TMDB API 키를 확인해주세요.');
  }
};

// 기존 회원가입 핸들러
const handleSignUp = async () => {
  try {
    const users = getUsers();
    if (users.some((u: any) => u.username === signupForm.username)) {
      alert('이미 등록된 사용자입니다.');
      return;
    }

    await tmdbApi.validateApiKey(signupForm.password);

    users.push({
      username: signupForm.username,
      email: signupForm.email,
      apiKey: signupForm.password
    });
    saveUsers(users);

    localStorage.setItem('TMDb-Key', signupForm.password);
    localStorage.setItem('userId', signupForm.username);
    localStorage.setItem('isAuthenticated', 'true');

    alert('회원가입이 완료되었습니다!');
    router.push('/');
  } catch (error) {
    alert('잘못된 API 키입니다. TMDB API 키를 확인해주세요.');
  }
};

/** ===============================
 *   카카오 로그인 로직
 * =============================== */
const loginWithKakao = () => {
  const kakao = window.Kakao;
  if (!kakao) {
    alert('카카오 SDK 로드 실패');
    return;
  }
  if (!navigator.onLine) {
    alert('인터넷 연결을 확인해주세요');
    return;
  }
  kakao.Auth.login({
    scope: 'profile_nickname', // 필요한 권한
    success: (authObj: any) => {
      console.log('카카오 로그인 성공, 토큰:', authObj.access_token);
      localStorage.setItem('kakao_token', authObj.access_token);

      const users = getUsers();

      kakao.API.request({
        url: '/v2/user/me',
        success: (res: any) => {
          console.log('카카오 사용자 정보:', res);
          const nickname = res.kakao_account?.profile?.nickname ?? '';
          localStorage.setItem('userId', nickname);
          localStorage.setItem('isAuthenticated', 'true');

          users.push({
            username: nickname,
            email: '',
            apiKey: ''
          });
          saveUsers(users);

          console.log(
            '카카오 프로필 이미지:',
            res.kakao_account?.profile?.profile_image_url
          );

          window.location.href = './'; // 로그인 후 메인 페이지로 리디렉션
        },
        fail: (error: any) => {
          console.error('카카오 사용자 정보 요청 실패:', error);
          alert('카카오 사용자 정보 조회 실패');
        }
      });
    },
    fail: (err: any) => {
      console.error('카카오 로그인 실패:', err);
      alert('카카오 로그인 실패');
    }
  });
};

/** 모드 전환 (Login ↔ SignUp) */
const toggleMode = () => {
  isSignUpMode.value = !isSignUpMode.value;
};
</script>

<style scoped>
/* Add your styles here */
</style>
