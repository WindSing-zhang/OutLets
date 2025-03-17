<template>
  <div class="quiz-container">
    <img
      class="backBtn"
      src="@/assets/images/answer/back.png"
      alt="quiz-bg"
      @click="goBack"
    />
    <div class="answer-container">
      <img
        class="answer-title"
        src="@/assets/images/answer/title.webp"
        alt="answer-title"
      />
      <img
        class="panda-img"
        src="@/assets/images/answer/panda.png"
        alt="panda-img"
      />
      <div v-for="(item, index) in questions" :key="index">
        <div class="answer-content" v-if="answered === index && answered < 4">
          <div class="answer-content-title">
            {{ `第${index + 1}题：${item.content}` }}
          </div>
          <div>
            <div
              class="answer-content-item"
              v-for="(option, index1) in item.options"
              :key="index"
              :class="{ active: activeOption === option.id }"
              @click="handleAnswer(option.id)"
            >
              <div class="answer-content-item-title">
                <span>{{
                  index1 === 0
                    ? "A."
                    : index1 === 1
                    ? "B."
                    : index1 === 2
                    ? "C."
                    : index1 === 3
                    ? "D."
                    : ""
                }}</span>
                <span>{{ option.content }}</span>
              </div>
            </div>
            <nut-button
              class="submit-btn"
              v-if="index < questions.length - 1"
              color="linear-gradient(to top, #F96E23, #FFD548)"
              :disabled="!activeOption"
              @click="handleNext(activeOption, item.id)"
            >
              下一题
            </nut-button>
            <nut-button
              v-else
              class="submit-btn"
              color="linear-gradient(to top, #F96E23, #FFD548)"
              :disabled="!activeOption"
              @click="handleSubmit(activeOption, item.id)"
            >
              {{ "确定" }}
            </nut-button>
          </div>
        </div>
      </div>
      <div class="answer-content" v-if="answered == 3">
        <div v-if="is_correct" style="margin-bottom: 3rem">
          <img
            class="answer-img"
            src="@/assets/images/answer/true.png"
            alt=""
          />
          <div
            class="answer-content-title"
            style="text-align: center; margin-top: 6rem"
          >
            今日三道问题全部回答正确，<br />已获得6%生长值。
          </div>
        </div>
        <div v-else style="margin-bottom: 3rem">
          <img
            class="answer-img"
            src="@/assets/images/answer/false.png"
            alt=""
          />
          <div
            class="answer-content-title"
            style="text-align: center; margin-top: 6rem"
          >
            有问题没有回答正确哦，<br />再思考一下呢。
          </div>
        </div>

        <nut-button
          class="submit-btn"
          v-if="!is_correct"
          color="linear-gradient(to top, #F96E23, #FFD548)"
          @click="goBackToAnswer"
        >
          返回
        </nut-button>
        <nut-button
          class="submit-btn"
          v-if="is_correct"
          color="linear-gradient(to top, #F96E23, #FFD548)"
          @click="goBack"
        >
          确定
        </nut-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { activityApi } from "@/api/activity";
const router = useRouter();
const emit = defineEmits(["refresh"]);
const answered = ref(0);
const questions = ref([]);
const activeOption = ref(null);
const answer = ref([]);
onMounted(() => {
  getData();
});

const getData = async () => {
  const res = await activityApi.getDailyQuestions();
  questions.value = res.questions;
  console.log(questions.value);
};

const goBack = () => {
  emit("refresh");
  router.back();
};

const handleAnswer = (optionId: string) => {
  activeOption.value = optionId;
};

const handleNext = (optionId: string, questionId: string) => {
  const params = {
    question_id: questionId,
    answer_option_ids: [optionId],
  };
  answer.value.push(params);
  answered.value++;
  activeOption.value = null;
};

const is_correct = ref(false);
const handleSubmit = async (optionId: string, questionId: string) => {
  const params = {
    question_id: questionId,
    answer_option_ids: [optionId],
  };
  answer.value.push(params);
  try {
    const res = await activityApi.submitAnswer({ answers: answer.value });
    is_correct.value = res.every((item) => item.is_correct === true);
    answered.value++;
  } catch (e) {
    router.back();
  }
};

const goBackToAnswer = () => {
  answered.value = 0;
  is_correct.value = false;
  answer.value = [];
  activeOption.value = null;
};
</script>

<style lang="scss" scoped>
.quiz-container {
  min-height: 100vh;
  background: url("@/assets/images/quiz-bg.webp") no-repeat top center;
  background-size: cover;
  position: relative;
  overflow: hidden;
  .backBtn {
    width: 0.8rem;
    position: absolute;
    top: 1.2rem;
    left: 1rem;
  }
  .answer-container {
    width: 90%;
    position: absolute;
    bottom: 4rem;
    left: 50%;
    transform: translateX(-50%);
    background-color: #fff;
    border-radius: 1rem;
    .answer-title {
      width: 20rem;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      margin-top: -5.5rem;
    }
    .panda-img {
      width: 10rem;
      position: absolute;
      bottom: -3.5rem;
      left: -1rem;
    }
    .answer-content {
      min-height: 20rem;
      padding: 4rem 2rem 6rem 2rem;

      .answer-img {
        width: 10rem;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      .submit-btn {
        margin-top: 2rem;
        margin-left: 50%;
        transform: translateX(-50%);
      }
      :deep(.nut-button) {
        width: 5rem;
        height: 2rem;
        border-radius: 0.5rem;
        font-size: 0.9rem;
        padding: 0;
      }
      .answer-content-title {
        font-size: 1.2rem;
        font-weight: bold;
        color: #124c23;
      }
      .answer-content-item {
        height: 2.5rem;
        background-color: #d3eed7;
        border-radius: 2rem;
        margin-top: 1.5rem;
        color: #124c23;

        &.active {
          background-color: #124c23;
          color: #fff;
        }
        .answer-content-item-title {
          font-size: 1.1rem;
          text-align: center;
          line-height: 2.5rem;
          font-weight: 700;
        }
      }
    }
  }
}
</style>
