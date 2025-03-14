<template>
  <div>
    <nut-popup v-model:visible="show">
      <div
        class="login-form"
        v-if="fromType === 0 || fromType === 2 || fromType === 3"
      >
        <img
          class="close-icon"
          src="@/assets/images/closeGreen.png"
          alt="logo"
          @click="show = false"
        />
        <h2>信息登记</h2>
        <div class="form-item">
          <nut-input
            v-model="infoForm.name"
            placeholder="姓名"
            class="input"
            :disabled="fromType === 3"
          />
        </div>
        <div class="form-item">
          <nut-input
            v-model="infoForm.phone"
            placeholder="会员手机号"
            class="input"
            disabled
          >
            <template #prefix>
              <i class="phone-icon">📱</i>
            </template>
          </nut-input>
        </div>

        <div class="form-item">
          <nut-button
            type="success"
            block
            @click="handleSubmit"
            class="submit-btn"
            :disabled="fromType === 3"
            :color="fromType === 3 ? '#999' : '#38AF49'"
          >
            {{
              fromType === 0
                ? "提交"
                : fromType === 2 || fromType === 3
                ? "修改信息"
                : ""
            }}
          </nut-button>
        </div>
        <!-- 请填写已注册砂之船（重庆璧山）奥莱会员的姓名及会员手机号，并于2025年3月28日前往砂之船（重庆璧山）奥莱会员中心，凭登记信息领取春日限定礼品1份。 -->
        <p class="tips">
          请于2025年3月28日前往砂之船（重庆璧山）奥莱会员中心，凭登记信息领取春日限定礼品1份。
        </p>
      </div>
      <div class="login-form" v-if="fromType === 1">
        <img
          class="close-icon"
          src="@/assets/images/closeGreen.png"
          alt="logo"
          @click="show = false"
        />
        <h2>登记成功</h2>
        <nut-divider dashed> </nut-divider>
        <p
          class="tips"
          style="font-size: 1.2rem; text-indent: 2em; text-align: left"
        >
          您已成功完成领奖信息登记，后续可在游戏主页面“查看登记信息”中，查看已登记的领奖信息。
        </p>
        <p
          class="tips"
          style="font-size: 1.2rem; text-indent: 2em; text-align: left"
        >
          请您于2025年3月28日前往砂之船(重庆璧山)奥莱会员中心，凭最终的登记信息领取春日限定礼品1份。
        </p>
      </div>
    </nut-popup>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { showToast } from "@nutui/nutui";
import { userApi } from "@/api/user";
import { useUserStore } from "@/stores/user";
const userStore = useUserStore();
const emit = defineEmits(["refresh"]);
const show = ref(false);
const infoForm = ref({
  phone: userStore.userInfo?.phone,
  name: userStore.userInfo?.name,
});
const fromType = ref(null);
const init = (params: { type: number }) => {
  fromType.value = params.type;
  show.value = true;
};

const handleSubmit = async () => {
  if (!infoForm.value.name) {
    showToast.warn("请填写完整信息");
    return;
  }

  try {
    const loginRes = await userApi.completeUserInfo({
      name: infoForm.value.name,
    });
    showToast.success("提交成功");
    fromType.value = 1;
    emit("refresh");
  } catch (error) {
    // showToast.fail('登录失败，请重试');
  }
};

defineExpose({
  init,
});
</script>
<style scoped lang="scss">
@import "@/styles/variables.scss";
@import "@/styles/mixins.scss";
:deep(.nut-popup) {
  border-radius: 0.5rem;
  padding: 2rem 3rem;
  width: 18rem;
  overflow: visible;
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

.login-form {
  background: rgba($white, 0.95);
  border-radius: 1rem;
  margin: 0 auto;
  .close-icon {
    position: absolute;
    top: -1rem;
    right: -1rem;
    width: 2rem;
    height: 2rem;
  }
  h2 {
    text-align: center;
    margin-bottom: 2rem;
    color: #1d6737;
    // font-size: 1.5rem;
  }

  .form-item {
    margin-bottom: 1.5rem;
  }

  .submit-btn {
    --nutui-button-primary-background-color: #38af49;
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
  }
}
</style>
