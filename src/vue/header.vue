<template>
  <div id="container">
    <header class="app-header" :class="{ 'scrolled': isScrolled }">
      <div class="header-left">
        <div class="logo">
          <a href="/#/">
            <font-awesome-icon :icon="['fas', 'ticket']" style="height: 100%; color: #E50914;" />
          </a>
        </div>
        <nav class="nav-links desktop-nav">
          <ul>
            <li><a href="/#/">홈</a></li>
            <li><a href="/#/search">찾아보기</a></li>
            <li><a href="/#/wishlist">내가 찜한 리스트</a></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <!-- 로그인 상태에 따라 버튼을 분기 처리 -->
        <div v-if="isLoggedIn">
          <span class="user-name">안녕하세요, {{ userName }}님</span>
          <button class="icon-button" @click="handleLogout">
            <font-awesome-icon :icon="['fas', 'user']" />
          </button>
        </div>
        <div v-else>
          <button class="icon-button" @click="handleKakaoLogin">
            <font-awesome-icon :icon="['fas', 'user']" />
          </button>
        </div>
        <button class="icon-button mobile-menu-button" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
    </header>

    <!-- Mobile Navigation -->
    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <button class="close-button" @click="toggleMobileMenu">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <nav>
        <ul>
          <li><a href="/#/" @click="toggleMobileMenu">홈</a></li>
          <li><a href="/#/popular" @click="toggleMobileMenu">대세 콘텐츠</a></li>
          <li><a href="/#/search" @click="toggleMobileMenu">찾아보기</a></li>
          <li><a href="/#/wishlist" @click="toggleMobileMenu">내가 찜한 리스트</a></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import { library } from '@fortawesome/fontawesome-svg-core';

library.add(faSearch, faUser, faTicket, faBars, faTimes);

export default {
  name: 'MainHeader',
  components: {
    FontAwesomeIcon
  },
  data() {
    return {
      isScrolled: false,
      isMobileMenuOpen: false,
      isLoggedIn: false,
      userName: ""
    };
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    },
    handleKakaoLogin() {
      try {
        if (!window.Kakao.isInitialized()) {
          window.Kakao.init(import.meta.env.VITE_KAKAO_REST_API_KEY);
        }

        window.Kakao.Auth.login({
          success: (authObj) => {
            // 토큰 저장
            localStorage.setItem('kakaoToken', authObj.access_token);
            
            window.Kakao.API.request({
              url: "/v2/user/me",
              success: (res) => {
                // 상태 업데이트
                this.isLoggedIn = true;
                this.userName = res.kakao_account.profile.nickname;

                // 로컬 스토리지에 정보 저장
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('userName', res.kakao_account.profile.nickname);
                localStorage.setItem('kakaoUserInfo', JSON.stringify({
                  id: res.id,
                  account_email: res.kakao_account.email,
                  nickname: res.kakao_account.profile.nickname
                }));

                console.log('로그인 성공:', {
                  isLoggedIn: localStorage.getItem('isLoggedIn'),
                  userName: localStorage.getItem('userName'),
                  userInfo: localStorage.getItem('kakaoUserInfo')
                });

                this.$router.push('/');
              },
              fail: (error) => {
                console.error('사용자 정보 요청 실패:', error);
                alert("사용자 정보를 가져오는데 실패했습니다.");
              }
            });
          },
          fail: (err) => {
            console.error('카카오 로그인 실패:', err);
            alert("로그인에 실패했습니다.");
          }
        });
      } catch (error) {
        console.error('로그인 처리 중 오류:', error);
        alert("로그인 처리 중 오류가 발생했습니다.");
      }
    },

    handleLogout() {
      if (window.Kakao.Auth.getAccessToken()) {
        window.Kakao.Auth.logout(() => {
          // 상태 초기화
          this.isLoggedIn = false;
          this.userName = "";

          // 로컬 스토리지 클리어
          localStorage.removeItem('isLoggedIn');
          localStorage.removeItem('userName');
          localStorage.removeItem('kakaoUserInfo');
          localStorage.removeItem('kakaoToken');

          console.log('로그아웃 완료');
          this.$router.push("/signin");
        });
      } else {
        console.log('로그아웃: 이미 로그아웃 상태');
      }
    }
  },

  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // 로그인 상태 확인 개선
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    const userName = localStorage.getItem('userName');
    const userInfo = localStorage.getItem('kakaoUserInfo');

    console.log('마운트 시 로그인 상태:', { isLoggedIn, userName, userInfo });

    if (isLoggedIn === 'true' && userName) {
      this.isLoggedIn = true;
      this.userName = userName;
    }

    // 카카오 SDK 로드
    if (!window.Kakao) {
      const script = document.createElement('script');
      script.src = 'https://developers.kakao.com/sdk/js/kakao.min.js';
      script.async = true;
      script.onload = () => {
        console.log('카카오 SDK 로드 완료');
        window.Kakao.init(import.meta.env.VITE_KAKAO_REST_API_KEY);
      };
      document.head.appendChild(script);
    }
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style scoped>
.app-header {
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 4%;
  background-color: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  transition: background-color 0.3s ease;
}

.app-header:hover,
.app-header.scrolled {
  background-color: #141414;
}

.header-left,
.header-right {
  display: flex;
  align-items: center;
}

.logo {
  height: 30px;
  margin-right: 25px;
  justify-items: center;
  align-items: center;
}

.nav-links ul {
  display: flex;
  list-style-type: none;
  margin: 0;
  padding: 0;
}

.nav-links li {
  margin-right: 20px;
}

.nav-links a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 0.85rem;
  transition: color 0.3s ease;
}

.nav-links a:hover {
  color: #b3b3b3;
}

.icon-button {
  background: none;
  border: none;
  color: white;
  font-size: 1.2rem;
  margin-left: 20px;
  cursor: pointer;
}

.icon-button:hover {
  opacity: 0.5;
}

.mobile-menu-button {
  display: none;
}

.mobile-nav {
  display: none;
  position: fixed;
  top: 0;
  right: -100%;
  width: 50%;
  height: 100%;
  background-color: #141414;
  z-index: 1001;
  transition: right 0.3s ease;
}

.mobile-nav.open {
  right: 0;
}

.mobile-nav ul {
  list-style-type: none;
  padding: 0;
  margin-top: 60px;
}

.mobile-nav li {
  margin: 20px 0;
}

.mobile-nav a {
  color: #e5e5e5;
  text-decoration: none;
  font-size: 1.2rem;
  display: block;
  padding: 10px 20px;
}

.close-button {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}

@media (max-width: 768px) {
  .desktop-nav {
    display: none;
  }

  .mobile-menu-button {
    display: block;
  }

  .mobile-nav {
    display: block;
  }

  .icon-button {
    font-size: 0.75rem;
    margin-left: 10px;
  }

  a {
    text-align: left;
    font-size: 1.15rem !important;
  }
}
</style>
