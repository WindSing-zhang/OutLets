<template>
  <div class="login-page">
    <div class="background">
      <div class="logo-box">
        <div class="logo-but">
          <img src="@/assets/images/butterfly.webp" alt="OUTLETS" />
        </div>
        <div class="logo">
          <img src="@/assets/images/login-logo.webp" alt="OUTLETS" />
        </div>
      </div>
      <div class="login-form">
        <h2>登录</h2>
        <div class="form-item">
          <nut-input
            v-model="loginForm.phone"
            placeholder="手机号"
            class="input"
          >
            <template #prefix>
              <i class="phone-icon">📱</i>
            </template>
          </nut-input>
        </div>
        <div class="form-item code-input">
          <nut-input
            v-model="loginForm.code"
            placeholder="验证码"
            class="input"
          />
          <nut-button
            type="success"
            size="small"
            class="code-btn"
            :disabled="isCounting"
            @click="handleSendCode"
          >
            {{ isCounting ? `${countdown}s后重试` : "接收验证码" }}
          </nut-button>
        </div>
        <div class="form-item">
          <nut-button
            type="success"
            block
            @click="handleLogin"
            class="submit-btn"
          >
            提交
          </nut-button>
        </div>
        <p class="tips">
          为避免生长值发放失败，请填写已注册砂之船（重庆璧山）奥莱会员的手机号
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { userApi } from "@/api/user";
import { showToast } from '@nutui/nutui';

const router = useRouter();
const userStore = useUserStore();
const loginForm = ref({
  phone: "",
  code: "",
});

// 倒计时
const countdown = ref(60);
const isCounting = ref(false);

// 发送验证码
const handleSendCode = async () => {
  if (!loginForm.value.phone) {
    showToast.warn('请输入手机号');
    return;
  }
  if (!/^1[3-9]\d{9}$/.test(loginForm.value.phone)) {
    showToast.warn('请输入正确的手机号');
    return;
  }

  try {
    await userApi.sendSms({ phone: loginForm.value.phone });
    showToast.success('验证码已发送');
    // 开始倒计时
    isCounting.value = true;
    countdown.value = 60;
    const timer = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        clearInterval(timer);
        isCounting.value = false;
      }
    }, 1000);
  } catch (error) {
    showToast.fail('发送失败，请重试');
  }
};

const handleLogin = async () => {
  if (!loginForm.value.phone || !loginForm.value.code) {
    showToast.warn('请填写完整信息');
    return;
  }

  try {
    // 登录
    const loginRes = await userApi.login({
      phone: loginForm.value.phone,
      code: loginForm.value.code,
      activity_id: 1,
    });

    // 存储用户信息和token
    await userStore.setToken(loginRes.token);
    await userStore.setUserInfo(loginRes.user_info);

    showToast.success('登录成功');
    // 使用 nextTick 确保状态更新后再跳转
    await nextTick();
    router.replace("/");
  } catch (error) {
    // showToast.fail('登录失败，请重试');
  }
};
</script>

<style lang="scss" scoped>
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";

.login-page {
  min-height: 100vh;
  background: url("@/assets/images/login-bg.webp") no-repeat center center;
  background-size: cover;
  position: relative;
  overflow: hidden;
}

.background {
  width: 100%;
  min-height: 100vh;
  @include flex-column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  background: rgba($white, 0.1);
}

.logo-box {
  text-align: center;
  margin-bottom: 3rem;
  width: 100%;
  position: relative;

  .logo-but {
    position: absolute;
    top: -2rem;
    left: 10%;
    img {
      width: 2rem;
      animation: float 3s ease-in-out infinite;
    }
  }

  .logo {
    img {
      width: 15rem;
    }
  }
}

.login-form {
  width: 70%;
  background: rgba($white, 0.95);
  border-radius: 1rem;
  padding: 2rem 1.5rem;
  margin: 0 auto;

  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #1d6737;
    // font-size: 1.5rem;
  }

  .form-item {
    margin-bottom: 1.5rem;

    &.code-input {
      display: flex;
      gap: 1rem;

      .code-btn {
        padding: 0 1rem;
        height: 3rem;
      }
    }
  }

  .code-btn {
    white-space: nowrap;
    border-radius: 0.5rem;
    --nutui-button-primary-background-color: #1d6737;
  }

  .submit-btn {
    --nutui-button-primary-background-color: #1d6737;
    height: 3rem;
    border-radius: 0.5rem;
    margin-top: 1.5rem;
  }

  .tips {
    font-size: 0.875rem;
    color: #666;
    line-height: 1.4;
    margin-top: 1.5rem;
    text-align: center;
    padding: 0 0.75rem;
  }
}

:deep(.nut-input) {
  background: #f5f5f5;
  border-radius: 0.5rem;
  --nutui-input-padding: 1rem;
  --nutui-input-border-bottom: none;
  --nutui-input-font-size: 1rem;
  height: 3rem;

  .nut-input-inner {
    height: 100%;
  }
}

.phone-icon {
  margin-right: 0.75rem;
  font-size: 1.25rem;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-0.625rem);
  }
}
</style>
