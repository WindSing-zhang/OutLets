<template>
  <div>
    <nut-action-sheet v-model:visible="showActive">
      <div class="actionTitle">
        <img
          class="title"
          src="@/assets/images/quiz/title.webp"
          alt="home-bg"
        />
        <img
          class="closeBtn"
          src="@/assets/images/quiz/close.png"
          alt="home-bg"
          @click="showActive = false"
        />
      </div>
      <div class="actionBody">
        <div class="actionItem">
          <img
            class="icon"
            src="@/assets/images/quiz/answer.png"
            alt="home-bg"
          />
          <div class="actionItem-content">
            <div class="title">
              {{ `每日答题(${daily_questions.completed ? 1 : 0}/1)` }}
            </div>
            <div class="desc">正确回答3道题，即可获得6%生长值</div>
          </div>
          <nut-button
            :color="
              daily_questions.completed
                ? '#999'
                : 'linear-gradient(to top, #F96E23, #FFD548)'
            "
            @click="goAnswer"
            :disabled="daily_questions.completed"
          >
            {{
              isExpired
                ? "已结束"
                : daily_questions.completed
                ? "已完成"
                : "去答题"
            }}
          </nut-button>
        </div>
        <div class="actionItem">
          <img class="icon" src="@/assets/images/quiz/two.png" alt="home-bg" />
          <div class="actionItem-content">
            <div class="title">夜奥莱-膨胀金提前抢</div>
            <div class="desc">秒杀成功的用户，可获得10%生长值</div>
          </div>
          <nut-button
            color="linear-gradient(to top, #F96E23, #FFD548)"
            @click="emit('openRules', 'task1')"
          >
            查看详情
          </nut-button>
        </div>
        <div class="actionItem">
          <img
            class="icon"
            src="@/assets/images/quiz/three.png"
            alt="home-bg"
          />
          <div class="actionItem-content">
            <div class="title">夜奥莱-会员每日签到</div>
            <div class="desc">成功获得现金券的用户, 可获得10% 生长值</div>
          </div>
          <nut-button
            color="linear-gradient(to top, #F96E23, #FFD548)"
            @click="emit('openRules', 'task2')"
          >
            查看详情
          </nut-button>
        </div>
        <div class="actionItem">
          <img class="icon" src="@/assets/images/quiz/four.png" alt="home-bg" />
          <div class="actionItem-content">
            <div class="title">夜奥莱-299积分 抽千元大奖</div>
            <div class="desc">完成体验的用户，可获得10%生长值</div>
          </div>
          <nut-button
            color="linear-gradient(to top, #F96E23, #FFD548)"
            @click="emit('openRules', 'task3')"
          >
            查看详情
          </nut-button>
        </div>
        <div class="actionItem">
          <img class="icon" src="@/assets/images/quiz/five.png" alt="home-bg" />
          <div class="actionItem-content">
            <div class="title">夜奥莱-线上消费</div>
            <div class="desc">成功购买商品并收货, 一个订单可获得 10%生长值</div>
          </div>
          <nut-button
            color="linear-gradient(to top, #F96E23, #FFD548)"
            @click="emit('openRules', 'task4')"
          >
            查看详情
          </nut-button>
        </div>
      </div>
    </nut-action-sheet>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { activityApi } from "@/api/activity";
const router = useRouter();
const showActive = ref(false);
const emit = defineEmits(["openRules"]);

const goAnswer = () => {
  router.push("/answer");
};

const daily_questions = ref({
  completed: false,
});

const getData = async () => {
  const res = await activityApi.getTaskInfo();
  for (const element of res) {
    if (element.task_type === "daily_questions") {
      daily_questions.value = element;
    }
  }
};

const isExpired = ref(false);
const init = (expired: boolean) => {
  isExpired.value = expired;
  getData();
  showActive.value = true;
};

defineExpose({
  init,
});
</script>

<style lang="scss" scoped>
:deep(.nut-popup) {
  overflow: visible;
}

.actionTitle {
  width: 100%;
  height: 2.5rem;
  background-color: #38af49;
  border-top-left-radius: 1rem;
  border-top-right-radius: 1rem;
  position: relative;
  .title {
    z-index: 99999999;
    position: absolute;
    top: -1.2rem;
    left: 50%;
    transform: translateX(-50%);
    width: 15rem;
  }
  .closeBtn {
    position: absolute;
    top: -2.5rem;
    right: 0.5rem;
    width: 2rem;
    cursor: pointer;
    transition: transform 0.3s ease;
    pointer-events: auto;

    &:active {
      transform: scale(0.95);
    }
  }
}

.actionBody {
  background-color: #f2f3f2;
  padding: 0.5rem;
  .actionItem {
    border-radius: 0.5rem;
    background-color: #fff;
    border-radius: 0.5rem;
    height: 4rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 0.5rem;
    margin-top: 0.5rem;
    &:first-child {
      margin-top: 0;
    }
    .icon {
      width: 3rem;
    }

    .actionItem-content {
      text-align: left;
      flex: 1;
      margin-left: 0.6rem;
      .title {
        font-size: 1rem;
        font-weight: bold;
        color: #dc5648;
      }
      .desc {
        margin-top: 0.2rem;
        font-size: 0.6rem;
      }
    }

    :deep(.nut-button) {
      width: 5rem;
      height: 2rem;
      border-radius: 0.5rem;
      font-size: 0.9rem;
      padding: 0;
    }
  }
}
</style>
