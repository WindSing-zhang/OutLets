<template>
  <audio id="bgmusic" ref="bgMusic" loop autoplay preload="auto">
    <source src="@/assets/bgm.mp3" type="audio/mp3">
  </audio>
  <router-view @click="tryAutoPlay"></router-view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';

const bgMusic = ref<HTMLAudioElement | null>(null);

const tryAutoPlay = async () => {
  
  if (bgMusic.value) {
    bgMusic.value.volume = 0.1; // 设置音量为50%
    try {
      await bgMusic.value.play();
    } catch (err) {
      console.log('Auto play failed, waiting for user interaction');
      // 如果自动播放失败，等待用户交互
      document.addEventListener('click', () => {
        bgMusic.value?.play().catch(() => {});
      }, { once: true });
    }
  }
};

onMounted(() => {
  // 尝试自动播放
  tryAutoPlay();

  // 监听页面可见性变化
  document.addEventListener('visibilitychange', () => {
    if (bgMusic.value) {
      if (document.hidden) {
        bgMusic.value.pause();
      } else {
        bgMusic.value.play().catch(() => {});
      }
    }
  });
});
</script>

<style>
@import "./styles/nui-ui.scss";
.audio {
  display: none;
}
</style>
