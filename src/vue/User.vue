<template>
    <div class="user-profile">
      <div class="profile-item">
        <label>프로필 ID</label>
        <span>{{ userInfo.id }}</span>
      </div>
      <div class="profile-item">
        <label>이메일</label>
        <span>{{ userInfo.account_email }}</span>
      </div>
      <div class="profile-item">
        <label>닉네임</label>
        <span>{{ userInfo.nickname }}</span>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: "User",
    data() {
      return {
        // 로컬 스토리지에서 카카오 사용자 정보 가져오기
        userInfo: JSON.parse(localStorage.getItem('kakaoUserInfo') || '{}')
      };
    }
  };
  </script>
  
  <style scoped>
  .user-profile {
    padding: 20px;
    background-color: #f4f4f4;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    margin: 20px auto;
  }
  
  .profile-item {
    display: flex;
    justify-content: space-between;
    margin: 10px 0;
  }
  
  .profile-item label {
    font-weight: bold;
    color: #333;
  }
  
  .profile-item span {
    font-size: 1.1rem;
    color: #555;
  }
  </style>
  