<template>
  <div id="container">
    <!-- 로그인 상태에 따라 MainHeader를 조건부로 렌더링 -->
    <MainHeader :isLoggedIn="isLoggedIn" :userName="userName" @logout="handleLogout" />
    <router-view></router-view>
  </div>
</template>

<script>
import { defineComponent, ref, onMounted } from "vue";
import MainHeader from "@/vue/header.vue";

export default defineComponent({
  components: {
    MainHeader
  },
  setup() {
    // 로그인 상태와 사용자 이름을 관리
    const isLoggedIn = ref(false);
    const userName = ref("");

    // 페이지 새로 고침 시 로그인 상태 유지
    onMounted(() => {
      if (localStorage.getItem("isLoggedIn") === "true") {
        isLoggedIn.value = true;
        userName.value = localStorage.getItem("userName");
      }
    });

    // 로그아웃 처리
    const handleLogout = () => {
      isLoggedIn.value = false;
      userName.value = "";
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userName");
    };

    return {
      isLoggedIn,
      userName,
      handleLogout
    };
  }
});
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;
  color: white;
  overflow-x: hidden;
  background-color: #2b2b2b;
}

#container {
  width: 100%;
  min-height: 100vh;
  overflow-x: hidden;
}

#app {
  width: 95svw;
  overflow-x: hidden;
  min-height: 85svh;
}
</style>
