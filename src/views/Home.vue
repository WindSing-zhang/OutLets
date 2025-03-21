<template>
  <div class="home-container">
    <img class="home-logo" src="@/assets/images/home-logo.webp" alt="home-bg" />
    <img class="tianshi" src="@/assets/images/tianshi.png" alt="home-bg" />
    <img
      class="rulesBtn"
      src="@/assets/images/rules.png"
      alt="home-bg"
      @click="showRules"
    />
    <img
      v-if="data.growth_percent < 10"
      class="tree1"
      src="@/assets/images/tree/one.webp"
      alt="home-bg"
    />
    <img
      v-else-if="data.growth_percent < 40"
      class="tree1"
      src="@/assets/images/tree/two.webp"
      alt="home-bg"
    />
    <img
      v-else-if="data.growth_percent < 70"
      class="tree1"
      src="@/assets/images/tree/three.webp"
      alt="home-bg"
    />
    <img
      v-else-if="data.growth_percent < 100"
      class="tree1"
      src="@/assets/images/tree/four.webp"
      alt="home-bg"
    />
    <img
      v-else
      class="tree1"
      src="@/assets/images/tree/five.webp"
      alt="home-bg"
    />
    <div class="progress-container">
      <div class="progress-wrapper">
        <nut-progress
          :percentage="data.growth_percent"
          stroke-color="linear-gradient(90deg, #FD782B 0%,#FFD849 100%)"
          :show-text="false"
        />
        <img class="prize" src="@/assets/images/prize.png" alt="home-bg" />
      </div>
      <div class="growth-value">{{ `生长值${data.growth_percent}%` }}</div>
    </div>
    <div>
      <div class="toSubmit-wrapper">
        <div class="text" v-if="data.can_complete_profile">
          {{
            `生长值已满${
              data.growth_percent > 84 ? data.growth_percent + "%" : ""
            }`
          }}
        </div>
        <div class="toSubmit" v-if="data.can_complete_profile">
          <img
            src="@/assets/images/toSubmit.png"
            alt="home-bg"
            @click="showSubmitFrom"
          />
        </div>
        <div class="seeDJXX" v-if="data.is_profile_completed">
          <img
            src="@/assets/images/seeDJXX.png"
            alt="home-bg"
            @click="showSubmitFrom"
          />
        </div>
      </div>
      <div v-if="data.is_profile_completed"></div>
    </div>
    <img
      class="getSZZ"
      src="@/assets/images/getSZZ.webp"
      alt="home-bg"
      @click="showActive"
    />
    <activityAction
      ref="activityActionRef"
      @openRules="showRules"
      @refresh="getData"
    />
    <rulesDialog ref="rulesDialogRef" />
    <submitFrom ref="submitFromRef" @refresh="getData" />
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from "vue";
import activityAction from "@/components/activityAction.vue";
import rulesDialog from "@/components/rulesDialog.vue";
import submitFrom from "@/components/submitFrom.vue";
import { userApi } from "@/api/user";
import { activityApi } from "@/api/activity";
import dayjs from "dayjs";
import { useUserStore } from "@/stores/user";

const userStore = useUserStore();
const activityActionRef = ref<InstanceType<typeof activityAction>>();
const rulesDialogRef = ref<InstanceType<typeof rulesDialog>>();
const submitFromRef = ref<InstanceType<typeof submitFrom>>();

onMounted(async () => {
  getData();
});

const data = ref({
  growth_percent: 0,
  can_complete_profile: false,
  is_profile_completed: false,
});
const isExpired = ref(false);
const isNotStarted = ref(false);
const getData = async () => {
  try {
    const res = await userApi.getUserInfo();
    data.value = res;
    await userStore.setUserInfo(res);
    const activity = await activityApi.getActivityInfo();
    // 判断活动是否过期
    if (activity && activity.start_time && activity.end_time) {
      const startTime = dayjs(activity.start_time); // 活动开始时间
      const endTime = dayjs(activity.end_time); // 活动结束时间
      const currentTime = dayjs(); // 当前时间

      if (currentTime.isBefore(startTime)) {
        console.log("活动未开始");
        isNotStarted.value = true; // 标记活动未开始
        isExpired.value = false; // 活动未开始，肯定未过期
      } else if (currentTime.isAfter(endTime)) {
        console.log("活动已过期");
        isExpired.value = true; // 标记活动已过期
        isNotStarted.value = false; // 活动已过期，肯定不是未开始
      } else {
        console.log("活动正在进行中");
        isExpired.value = false; // 标记活动未过期
        isNotStarted.value = false; // 标记活动不是未开始
      }
    } else {
      console.log("活动信息缺失或开始/结束时间无效");
      isExpired.value = true; // 如果缺少 start_time 或 end_time，默认认为活动已过期
      isNotStarted.value = false;
    }
  } catch (e) {}
};

const showActive = () => {
  activityActionRef.value?.init(isExpired.value, isNotStarted.value);
};
const showRules = (anchor: string) => {
  rulesDialogRef.value?.init(anchor);
};
const showSubmitFrom = () => {
  let type = 0;
  // if (isExpired.value) {
  //   type = 3;
  // } else if (data.value.is_profile_completed) {
  //   type = 2;
  // } else if (data.value.can_complete_profile) {
  //   type = 0;
  // }
  if (data.value.can_complete_profile) {
    type = 0;
  } else if (isExpired.value) {
    type = 3;
  } else if (data.value.is_profile_completed) {
    type = 2;
  }
  submitFromRef.value?.init({
    type: type,
    isFull: data.value.growth_percent < 100 ? false : true,
  });
};
</script>

<style lang="scss" scoped>
@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.625rem);
  }
}
.home-container {
  min-height: 100vh;
  background: url("@/assets/images/home-bg.webp") no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;

  .tianshi {
    position: absolute;
    top: 16rem;
    left: 0.5rem;
    width: 5rem;
    animation: float 3s ease-in-out infinite;
    pointer-events: auto;
  }
  .rulesBtn {
    position: absolute;
    top: 1rem;
    right: 1rem;
    width: 3rem;
    cursor: pointer;
    transition: transform 0.3s ease;
    pointer-events: auto;

    &:active {
      transform: scale(0.95);
    }
  }
  .home-logo {
    width: 18rem;
    position: absolute;
    top: 3rem;
    left: 50%;
    transform: translateX(-50%);
  }
  .tree1 {
    width: 23rem;
    position: absolute;
    bottom: 10rem;
    left: 50%;
    transform: translateX(-50%);
    transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
    cursor: pointer;
    pointer-events: auto;

    &:active {
      animation: treeBounce 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
    }
  }
  .progress-container {
    width: 10rem;
    position: absolute;
    bottom: 7.7rem;
    left: 50%;
    transform: translateX(-50%);
    .progress-wrapper {
      position: relative;
      .prize {
        width: 1.6rem;
        position: absolute;
        top: -0.1rem;
        right: -0.7rem;
      }
    }
    :deep(.nut-progress-outer.nut-progress-base) {
      padding: 0.1rem;
    }
    .growth-value {
      font-size: 0.8rem;
      color: green;
      font-weight: bold;
      text-align: center;
    }
  }
  .getSZZ {
    width: 10rem;
    position: absolute;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%);
    transition: transform 0.1s ease;
    cursor: pointer;
    pointer-events: auto;

    &:active {
      transform: translateX(-50%) scale(0.95);
    }
  }
  .toSubmit-wrapper {
    position: absolute;
    bottom: 5.5rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 100;
    display: flex;
    align-items: center;
    .text {
      font-size: 0.8rem;
      color: red;
      font-weight: bold;
      margin-left: 5rem;
      text-wrap: nowrap;
      width: 7rem;
    }
    .toSubmit {
      cursor: pointer;
      pointer-events: auto;
      //margin-left: 1.5rem;
      img {
        width: 4rem;
      }
      &:active {
        transform: scale(0.95);
      }
    }
    .seeDJXX {
      cursor: pointer;
      pointer-events: auto;
      img {
        width: 6rem;
      }
      &:active {
        transform: scale(0.95);
      }
    }
  }
}

@keyframes treeBounce {
  0% {
    transform: translateX(-50%) scaleY(1);
  }
  20% {
    transform: translateX(-50%) scaleY(1.15) translateY(-0.8rem);
  }
  40% {
    transform: translateX(-50%) scaleY(0.95) translateY(-0.3rem);
  }
  60% {
    transform: translateX(-50%) scaleY(1.05) translateY(-0.5rem);
  }
  80% {
    transform: translateX(-50%) scaleY(0.98) translateY(-0.2rem);
  }
  100% {
    transform: translateX(-50%) scaleY(1);
  }
}
</style>
