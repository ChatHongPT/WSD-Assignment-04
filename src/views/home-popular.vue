<script setup lang="ts">
import MovieGrid from "@/components/popular/MovieTable.vue";
import { getURL4PopularMovies } from "@/script/movie/URL.ts";
import {defineComponent, onMounted, ref} from "vue";
import { faTh, faBars } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import MovieInfiniteScroll from "@/components/popular/MovieInfiniteScroll.vue";

library.add(faTh, faBars);

defineComponent({
  components: {
    FontAwesomeIcon
  }
});

const apiKey = localStorage.getItem('TMDb-Key') || '';
const genreCode = ''; // 필수 prop 추가
const fetchURL = getURL4PopularMovies(apiKey);

const currentView = ref('grid');

const setView = (view: string) => {
  currentView.value = view;
};

const disableScroll = () => {
  document.body.style.overflow = 'hidden';
};

const enableScroll = () => {
  document.body.style.overflow = 'auto';
};

onMounted(() => {
  disableScroll();
})
</script>

<template>
  <div class="popular-container">
    <div class="view-toggle">
      <button @click="() => {
        setView('grid');
        disableScroll();
      }" :class="{ active: currentView === 'grid' }">
        <font-awesome-icon :icon="['fas', 'th']" />
      </button>
      <button @click="() => {
        setView('list');
        enableScroll();
      }" :class="{ active: currentView === 'list' }">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
    </div>
    <MovieGrid
        v-if="currentView === 'grid'"
        title="인기 영화"
        :fetchUrl="fetchURL"
        :apiKey="apiKey"
        :genreCode="genreCode"
    />
    <MovieInfiniteScroll
        v-if="currentView === 'list'"
        title="인기 영화"
        :fetchUrl="fetchURL"
        :apiKey="apiKey"
        :genreCode="genreCode"
    />
  </div>
</template>
