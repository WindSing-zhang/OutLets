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
            <div :id="'task2'">夜奥莱 - 膨胀金提前抢</div>
            2025年3月25日至3月27日每天12:00，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，参与「1元秒30元无门槛现金券」活动。秒杀成功的用户，可获得10%生长值。
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
            <div :id="'task3'">夜奥莱 - 会员每日签到</div>
            2025年3月13日至3月27日，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，完成每日签到，连续登陆签到满10天（3月13日至3月22日
            ）即赠30元现金券（单笔满200元可用），连续签到满15天，再赠100元现金券（单笔满600元可用）。成功获得现金券的用户，可获得10%生长值。
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
              :id="'task4'"
            >
              夜奥莱 - 299积分抽千元大奖
            </div>
            2025年3月13日至3月27日，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，消耗299积分获得抽奖机会，即有机会获得超级惊喜。完成「299积分抽千元大奖」体验的用户，可获得10%生长值。
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
              :id="'task5'"
            >
              夜奥莱 - 线上消费
            </div>
            活动期间，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，成功购买商品并收货，一个订单可获得10%生长值。
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
            <p>活动时间：</p>
            <p class="text">2025年3月18日10:00至3月27日21:30:00（共10天）</p>
          </div>
          <div class="rules-content-item">
            <p>活动对象：</p>
            <p class="text">
              已注册砂之船（重庆璧山）奥莱会员的用户（以下简称“用户”）
            </p>
          </div>
          <div class="rules-content-item">
            <p>活动内容：</p>
            <p class="text">
              活动期间，用户通过完成指定任务获得植物生长值，植物生长值达到85%，可获得【50元代金券1张（满300元可用）】，植物生长值达到100%，可获得【春日限定礼品1份】。<br />植物生长值达到85%后，将开放信息登记入口，用户可自行前往登记，登记信息需与砂之船（重庆璧山）奥莱会员会员注册信息保持一致。50元代金券将于活动结束后1个工作日内发放至手机号码对应的夜奥莱会员账户中；春日限定礼品请于2025年3月28日至3月30日前往砂之船（重庆璧山）奥莱会员中心，凭登记信息领取。
            </p>
          </div>
          <div class="rules-content-item">
            <p>做任务得生长值：</p>
            <div class="text">
              <div
                :id="'task1'"
                :class="{ highlighted: activeAnchor === 'task1' }"
              >
                1、每日答题
              </div>
              活动期间，用户每日可参与答题获得生长值。每日3道题目均回答正确，可获得6%生长值，每日仅可获得1次。如有问题回答错误，可重新开始答题，直至当日的3道题目均回答正确。活动期间，同一用户最多可获得60%生长值。<br />
              <div
                :id="'task2'"
                :class="{ highlighted: activeAnchor === 'task2' }"
              >
                2、夜奥莱 - 膨胀金提前抢
              </div>
              2025年3月25日至3月27日每天12:00，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，参与「1元秒30元无门槛现金券」活动。秒杀成功的用户，可获得10%生长值。
              <div class="QRCode">
                <img src="@/assets/images/rules/pzj.webp" alt="" />
                <div style="text-align: center">扫码抢膨胀金</div>
                <div>
                  注：本任务所获得的生长值，将在1个工作日后于游戏内体现。
                </div>
              </div>
              <div
                :id="'task3'"
                :class="{ highlighted: activeAnchor === 'task3' }"
              >
                3、夜奥莱 - 会员每日签到
              </div>
              2025年3月13日至3月27日，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，完成每日签到，连续登陆签到满10天（3月13日至3月22日
              ）即赠30元现金券（单笔满200元可用），连续签到满15天，再赠100元现金券（单笔满600元可用）。成功获得现金券的用户，可获得10%生长值。
              <div class="QRCode">
                <img src="@/assets/images/rules/qd.webp" alt="" />
                <div style="text-align: center">扫码签到</div>
                <div>
                  注：本任务所获得的生长值，将在1个工作日后于游戏内体现。
                </div>
              </div>
              <div
                :id="'task4'"
                :class="{ highlighted: activeAnchor === 'task4' }"
              >
                4、夜奥莱 - 299积分抽千元大奖
              </div>
              2025年3月13日至3月27日，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，消耗299积分获得抽奖机会，即有机会获得超级惊喜。完成「299积分抽千元大奖」体验的用户，可获得10%生长值。
              <div class="QRCode">
                <img src="@/assets/images/rules/cj.webp" alt="" />
                <div style="text-align: center">扫码抽奖</div>
                <div>
                  注：本任务所获得的生长值，将在1个工作日后于游戏内体现。
                </div>
              </div>
              <div
                :id="'task5'"
                :class="{ highlighted: activeAnchor === 'task5' }"
              >
                5、夜奥莱 - 线上消费
              </div>
              活动期间，用户登录夜奥莱小程序，选择“砂之船（重庆璧山）奥莱”，成功购买商品并收货，一个订单可获得10%生长值。
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
            <p>特别提醒：</p>
            <p class="text">
              1、活动结束后，用户不可再通过完成任务获得生长值。<br />
              2、在活动截止前，完成「夜奥莱」相关任务所获得的生长值，将在1个工作日内发放，于游戏主页面中生长值进度条中体现。<br />
              3、活动结束后，生长值达到85%但未登记的用户，仍可进行信息登记，成功登记后不可再修改信息。<br />
              4、活动结束后，已成功登记的用户，不可再修改登记信息。<br />
              1、活动结束后，用户不可再通过完成任务获得生长值。<br />
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
</style>
