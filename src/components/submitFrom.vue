<template>
  <div>
    <nut-popup v-model:visible="show" :style="{ padding: '30px 50px' }">
      正文
    </nut-popup>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";

const show = ref(false);

const init = () => {
  show.value = true;
};

defineExpose({
  init,
});
</script>
<style scoped lang="scss"></style>
