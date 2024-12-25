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
    // 카카오 로그인 처리
    handleKakaoLogin() {
      if (!window.Kakao.isInitialized()) {
        window.Kakao.init(import.meta.env.VITE_KAKAO_REST_API_KEY);  // Vite 환경 변수에서 API 키 가져오기
      }

      window.Kakao.Auth.login({
        success: (authObj) => {
          window.Kakao.API.request({
            url: "/v2/user/me",
            success: (res) => {
              this.isLoggedIn = true;
              this.userName = res.kakao_account.profile.nickname;

              // 로컬 스토리지에 사용자 정보 저장
              const userInfo = {
                id: res.id,
                account_email: res.kakao_account.email,
                nickname: res.kakao_account.profile.nickname
              };
              localStorage.setItem("kakaoUserInfo", JSON.stringify(userInfo)); // 로컬스토리지에 저장

              console.log("User Info:", res); // 콘솔에 회원 정보 출력

              // 메인 페이지로 리디렉션
              this.$router.push('/');  // '/'는 홈 페이지의 경로입니다
            },
            fail: (error) => {
              alert("Failed to fetch Kakao user info: " + JSON.stringify(error));
            }
          });
        },
        fail: (err) => {
          alert("Kakao login failed: " + JSON.stringify(err));
        }
      });
    },
    // 로그아웃 처리
    handleLogout() {
      window.Kakao.Auth.logout(() => {
        this.isLoggedIn = false;
        this.userName = "";

        // 로컬 스토리지에서 로그인 정보 삭제
        localStorage.removeItem("isLoggedIn");
        localStorage.removeItem("userName");

        this.$router.push("/signin"); // 로그아웃 후 로그인 페이지로 리디렉션
      });
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);

    // 새로고침 시 로그인 상태 확인
    if (localStorage.getItem("isLoggedIn") === "true") {
      this.isLoggedIn = true;
      this.userName = localStorage.getItem("userName");
    }

    // 카카오 SDK 로드
    if (!window.Kakao) {
      const script = document.createElement("script");
      script.src = "https://developers.kakao.com/sdk/js/kakao.min.js";
      script.onload = () => console.log("Kakao SDK loaded");
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
