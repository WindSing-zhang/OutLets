<template>
  <div>
    <nut-dialog
      v-model:visible="showRules"
      noFooter
      noOkBtn
      closeOnClickOverlay
      noCancelBtn
      text-align="left"
    >
      <template #default>
        <div class="rules-content" v-if="activeAnchor === 'task1'">
          <img
            src="@/assets/images/close.png"
            alt="rules"
            class="close"
            @click="showRules = false"
          />
          <div class="rules-content-item">
            <div class="text-bold">砂之船夜奥莱-膨胀金提前抢</div>
            2025年3月25日至3月27日每天12:00，扫码参与「1元秒30元无门槛现金券」活动。秒杀成功的用户，可获得10%生长值。
            <div class="QRCode">
              <img src="@/assets/images/rules/pzj.webp" alt="" />
              <div style="text-align: center">扫码抢膨胀金</div>
              <div>注：本任务所获得的生长值，将在1个工作日后于游戏内体现。</div>
            </div>
          </div>
        </div>
        <div class="rules-content" v-else-if="activeAnchor === 'task2'">
          <img
            src="@/assets/images/close.png"
            alt="rules"
            class="close"
            @click="showRules = false"
          />
          <div class="rules-content-item">
            <div class="text-bold">砂之船夜奥莱-会员每日签到</div>
            活动期间，扫码参与「会员签到」。成功签到1天，可获得10%生长值。
            <div class="QRCode">
              <img src="@/assets/images/rules/qd.webp" alt="" />
              <div style="text-align: center">扫码签到</div>
              <div>注：本任务所获得的生长值，将在1个工作日后于游戏内体现。</div>
            </div>
          </div>
        </div>
        <div class="rules-content" v-else-if="activeAnchor === 'task3'">
          <img
            src="@/assets/images/close.png"
            alt="rules"
            class="close"
            @click="showRules = false"
          />
          <div class="rules-content-item">
            <div
              class="text-bold"
            >
            砂之船夜奥莱-299积分抽千元大奖
            </div>
            活动期间，扫码参与「299积分抽千元大奖」，可获得10%生长值。
            <div class="QRCode">
              <img src="@/assets/images/rules/cj.webp" alt="" />
              <div style="text-align: center">扫码抽奖</div>
              <div>注：本任务所获得的生长值，将在1个工作日后于游戏内体现。</div>
            </div>
          </div>
        </div>
        <div class="rules-content" v-else-if="activeAnchor === 'task4'">
          <img
            src="@/assets/images/close.png"
            alt="rules"
            class="close"
            @click="showRules = false"
          />
          <div class="rules-content-item">
            <div
              class="text-bold"
            >
            砂之船夜奥莱-线上消费
            </div>
            活动期间，扫码进入线上官方商城「砂之船夜奥莱」活动专区，成功下单购买商品，一个订单可获得10%生长值，上不封顶。
            <div class="QRCode">
              <img src="@/assets/images/rules/xf.webp" alt="" />
              <div style="text-align: center">扫码前往夜奥莱</div>
              <div>注：本任务所获得的生长值，将在1个工作日后于游戏内体现。</div>
            </div>
          </div>
        </div>
        <div class="rules-content" v-else>
          <img
            src="@/assets/images/close.png"
            alt="rules"
            class="close"
            @click="showRules = false"
          />
          <div class="rules-content-item">
            <p class="text-bold">活动时间：</p>
            <p class="text">2025年3月18日10:00至3月27日21:30:00（共10天）</p>
          </div>
          <div class="rules-content-item">
            <p class="text-bold">活动对象：</p>
            <p class="text">
              已注册砂之船（重庆璧山）奥莱会员的用户（以下简称“用户”）
            </p>
          </div>
          <div class="rules-content-item">
            <p class="text-bold">活动内容：</p>
            <p class="text">
              活动期间，用户通过完成指定任务获得植物生长值，有机会获得对应礼品。<br />
              ◆ 植物生长值达到85%，可获得【50元代金券1张（满300元可用）】；<br />
              ◆ 植物生长值达到100%，可获得【春日限定礼品1份】。
            </p>
            <p class="text">植物生长值达到85%后，系统开放信息登记入口-用户进入登记（登记信息须与砂之船奥莱会员信息一致）</p>
            <p class="text">注：</p>
            <p class="text">
              ▶ 50元代金券将于活动结束后1个工作日内发放至会员卡中，请扫码查收。<br />
              ▶ 春日限定礼品请于2025年3月28日至3月30日前往砂之船（重庆璧山）奥莱3L B区 客服中心，凭登记信息领取。
            </p>
          </div>
          <div class="rules-content-item">
            <p class="text-bold">做任务得生长值：</p>
            <div class="text">
              <div
                class="text-bold"
                :class="{ highlighted: activeAnchor === 'task1' }"
              >
                1、每日答题
              </div>
              活动期间，用户每日可参与答题获得生长值。每日3道题目均回答正确，可获得6%生长值，每日仅可获得1次。如有问题回答错误，可重新开始答题，直至当日的3道题目均回答正确。活动期间，同一用户最多可获得60%生长值。<br />
              <div
                class="text-bold"
                style="margin-top: 0.5rem;"
                :class="{ highlighted: activeAnchor === 'task2' }"
              >
                2、砂之船夜奥莱-膨胀金提前抢
              </div>
              2025年3月25日至3月27日每天12:00，扫码参与「1元秒30元无门槛现金券」活动。秒杀成功的用户，可获得10%生长值。
              <div class="QRCode">
                <img src="@/assets/images/rules/pzj.webp" alt="" />
                <div style="text-align: center">扫码抢膨胀金</div>
                <div>
                  注：本任务所获得的生长值，将在1个工作日后于游戏内体现。
                </div>
              </div>
              <div
                class="text-bold"
                :class="{ highlighted: activeAnchor === 'task3' }"
              >
                3、砂之船夜奥莱-会员每日签到
              </div>
              活动期间，扫码参与「会员签到」。成功签到1天，可获得10%生长值。
              <div class="QRCode">
                <img src="@/assets/images/rules/qd.webp" alt="" />
                <div style="text-align: center">扫码签到</div>
                <div>
                  注：本任务所获得的生长值，将在1个工作日后于游戏内体现。
                </div>
              </div>
              <div
                class="text-bold"
                :class="{ highlighted: activeAnchor === 'task4' }"
              >
                4、砂之船夜奥莱-299积分抽千元大奖
              </div>
              活动期间，扫码参与「299积分抽千元大奖」，可获得10%生长值。
              <div class="QRCode">
                <img src="@/assets/images/rules/cj.webp" alt="" />
                <div style="text-align: center">扫码抽奖</div>
                <div>
                  注：本任务所获得的生长值，将在1个工作日后于游戏内体现。
                </div>
              </div>
              <div
                class="text-bold"
                :class="{ highlighted: activeAnchor === 'task5' }"
              >
                5、夜奥莱 - 线上消费
              </div>
              活动期间，扫码进入线上官方商城「砂之船夜奥莱」活动专区，成功下单购买商品，一个订单可获得10%生长值，上不封顶。
              <div class="QRCode">
                <img src="@/assets/images/rules/xf.webp" alt="" />
                <div style="text-align: center">扫码前往夜奥莱</div>
                <div>
                  注：本任务所获得的生长值，将在1个工作日后于游戏内体现。
                </div>
              </div>
            </div>
          </div>
          <div class="rules-content-item">
            <p class="text-bold">特别提醒：</p>
            <p class="text">
              1、活动结束后，用户不可再通过完成任务获得生长值。<br />
              2、在活动截止前，完成「砂之船夜奥莱」相关任务所获得的生长值，将在1个工作日后发放，于游戏主页面中生长值进度条中体现。<br />
              3、活动结束后，生长值达到85%但未登记的用户，仍可进行信息登记，成功登记后不可再修改信息。<br />
              4、活动结束后，已成功登记的用户，不可再修改登记信息。<br />
              *活动最终解释权归主办方所有
            </p>
          </div>
        </div>
      </template>
    </nut-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, nextTick } from "vue";
const showRules = ref(false);
let targetAnchor = ref("");
let activeAnchor = ref("");

const init = (anchor: string = "") => {
  activeAnchor.value = anchor;
  // targetAnchor.value = anchor;
  // activeAnchor.value = anchor;
  showRules.value = true;
  // if (targetAnchor.value) {
  //   nextTick(() => {
  //     const element = document.getElementById(targetAnchor.value);
  //     if (element) {
  //       const scrollContainer = document.querySelector(
  //         ".nut-dialog__content"
  //       ) as HTMLElement;
  //       if (scrollContainer) {
  //         const elementTop = element.offsetTop - scrollContainer.offsetTop;
  //         scrollContainer.scrollTop = elementTop;
  //       } else {
  //         element.scrollIntoView({ behavior: "smooth" });
  //       }
  //     }
  //   });
  // }
};

defineExpose({
  init,
});
</script>

<style lang="scss" scoped>
:deep(.nut-popup) {
  border-radius: 0.5rem;
  // background: linear-gradient(to bottom, #0598ff, #73d2f6);
}
:deep(.nut-dialog) {
  padding: 38px 12px 16px 12px;
  width: 20rem;
  position: relative;
}
:deep(.nut-dialog__content) {
  color: #333;
  margin: 0;
  max-height: 30rem;
}
.rules-content {
  .close {
    position: absolute;
    z-index: 9999999999999999;
    top: 1rem;
    right: 1rem;
    width: 0.8rem;
  }
  .rules-content-item {
    line-height: 1.5;
    font-size: 0.8rem;
    margin-bottom: 0.5rem;
    .QRCode {
      width: 100%;
      margin-bottom: 0.5rem;
      img {
        margin-left: 50%;
        transform: translateX(-50%);
        width: 5rem;
      }
    }
    .text {
      padding-left: 0.7rem;
    }
  }
}
.highlighted {
  background-color: yellow; /* 可根据需要修改高亮背景颜色 */
  color: black; /* 可根据需要修改高亮文字颜色 */
}
.text-bold {
  font-weight: bold;
}
</style>
