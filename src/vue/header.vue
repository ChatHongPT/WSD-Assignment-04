<template>
  <div id="container">
    <header class="app-header" :class="{ 'scrolled': isScrolled }">
      <div class="header-left">
        <div class="logo">
          <router-link :to="`${baseUrl}/`">
            <font-awesome-icon :icon="['fas', 'ticket']" style="height: 100%; color: #E50914;" />
          </router-link>
        </div>
        <nav class="nav-links desktop-nav">
          <ul>
            <li><router-link :to="`${baseUrl}/`">홈</router-link></li>
            <li><router-link :to="`${baseUrl}/search`">찾아보기</router-link></li>
            <li><router-link :to="`${baseUrl}/wishlist`">내가 찜한 리스트</router-link></li>
          </ul>
        </nav>
      </div>
      <div class="header-right">
        <button v-if="!isAuthenticated" class="icon-button" @click="goToSignIn">
          로그인
        </button>
        <div v-else class="user-profile">
          <img v-if="userName" src="https://via.placeholder.com/30" alt="User Profile" class="profile-img" />
          <span v-if="userName" class="user-name">{{ userName }}</span>
          <button class="icon-button logout-button" @click="removeKey">로그아웃</button>
        </div>
        <button class="icon-button mobile-menu-button" @click="toggleMobileMenu">
          <font-awesome-icon :icon="['fas', 'bars']" />
        </button>
      </div>
    </header>

    <div class="mobile-nav" :class="{ 'open': isMobileMenuOpen }">
      <button class="close-button" @click="toggleMobileMenu">
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
      <nav>
        <ul>
          <li><router-link :to="`${baseUrl}/`" @click="toggleMobileMenu">홈</router-link></li>
          <li><router-link :to="`${baseUrl}/search`" @click="toggleMobileMenu">찾아보기</router-link></li>
          <li><router-link :to="`${baseUrl}/wishlist`" @click="toggleMobileMenu">내가 찜한 리스트</router-link></li>
        </ul>
      </nav>
    </div>
  </div>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faSearch, faUser, faTicket, faBars, faTimes } from '@fortawesome/free-solid-svg-icons'
import { library } from '@fortawesome/fontawesome-svg-core'

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
      userName: '',
      isAuthenticated: false,
      baseUrl: import.meta.env.VITE_BASE_URL || ''
    }
  },
  methods: {
    checkAuthentication() {
      const storedUserName = localStorage.getItem('User-Name');
      if (storedUserName) {
        this.isAuthenticated = true;
        this.userName = storedUserName;
      }
    },
    removeKey() {
      localStorage.removeItem('TMDb-Key');
      localStorage.removeItem('User-Name');
      localStorage.removeItem('User-Email');
      localStorage.removeItem('Kakao-Access-Token');
      this.isAuthenticated = false;
      this.userName = '';
      this.$router.push(`${this.baseUrl}/signin`);
    },
    goToSignIn() {
      this.$router.push(`${this.baseUrl}/signin`);
    },
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen;
    },
    handleScroll() {
      this.isScrolled = window.scrollY > 50;
    }
  },
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
    this.checkAuthentication();
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  }
};
</script>

<style>
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

.user-profile {
  display: flex;
  align-items: center;
  margin-left: 10px;
}

.profile-img {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  margin-right: 8px;
}

.user-name {
  font-size: 0.85rem;
  color: white;
}

.logout-button {
  font-size: 0.85rem;
  padding: 5px 10px;
  background-color: transparent;
  color: white;
  border: 1px solid white;
  border-radius: 5px;
  cursor: pointer;
}

.logout-button:hover {
  background-color: #e50914;
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
