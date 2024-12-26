<template>
    <div>
      <p>카카오 로그인 완료되었습니다.</p>
      <p v-if="user.name">Welcome, {{ user.name }}!</p>
      <p v-else>Loading...</p>
    </div>
  </template>
  
  <script>
  import { ref, onMounted } from 'vue'
  import axios from 'axios'
  import { useRouter } from 'vue-router'
  
  export default {
    setup() {
      const user = ref({})
      const router = useRouter()
  
      const getKakaoToken = async (code) => {
        const data = {
          grant_type: "authorization_code",
          client_id: import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY, // JavaScript API 키
          redirect_uri: "http://localhost:3001/kakaologin/callback", // 리디렉션 URI
          code: code
        };
  
        const queryString = Object.keys(data)
          .map((k) => encodeURIComponent(k) + "=" + encodeURIComponent(data[k]))
          .join("&");
  
        try {
          const result = await axios.post(
            "https://kauth.kakao.com/oauth/token",
            queryString,
            {
              headers: {
                "Content-type": "application/x-www-form-urlencoded;charset=utf-8",
              },
            }
          );
          return result.data;
        } catch (e) {
          console.log(e)
          return e
        }
      }
  
      const getKakaoUserInfo = async () => {
        let data = ""
        await window.Kakao.API.request({ url: "/v2/user/me" })
          .then((response) => {
            data = response
          })
          .catch((error) => {
            console.log(error)
          })
        return data
      }
  
      const setKakaoToken = async (code) => {
        const data = await getKakaoToken(code)
        window.Kakao.Auth.setAccessToken(data.access_token)
        await setUserInfo(data.access_token) // 전달된 토큰을 setUserInfo로 넘김
      }
  
      const setUserInfo = async (accessToken) => {
        const res = await getKakaoUserInfo()
        const userInfo = {
          name: res.kakao_account.profile.nickname,
          email: res.kakao_account.email
        }
        user.value = userInfo
  
        // 카카오 액세스 토큰을 로컬 스토리지에 저장
        localStorage.setItem('Kakao-Access-Token', accessToken)
  
        // TMDb API Key를 로컬 스토리지에 저장
        localStorage.setItem('TMDb-Key', import.meta.env.VITE_TMDB_API_KEY)
  
        // 사용자 이름과 이메일을 로컬 스토리지에 저장
        localStorage.setItem('User-Name', userInfo.name)
        localStorage.setItem('User-Email', userInfo.email)
  
        // 유저 이름과 이메일만 콘솔에 찍기
        console.log('User Name:', userInfo.name)
        console.log('User Email:', userInfo.email)
  
        // 로그인 후 메인 페이지로 리디렉션
        router.push('/')
      }
  
      onMounted(() => {
        const urlParams = new URLSearchParams(window.location.search)
        if (urlParams.has("code")) {
          const code = urlParams.get("code")
          setKakaoToken(code)
        }
      })
  
      return { user }
    }
  }
  </script>
  