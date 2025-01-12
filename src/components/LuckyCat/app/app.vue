<script setup>
import { ref, Transition, watch } from 'vue'
import router from '../../../router/router';
import FamilyService from '../../../api/family/family.services';

const readyRender = ref(false)

const activeVal = ref(0);

const familyID = ref(null);

const identity = ref(0);

const credit = ref(0);

const startTime = ref("07:00");

const endTime = ref("07:30");

const hasCredit = ref(false);

const isLate = ref(false);

watch(() => router.currentRoute.value.name, newVal => {
    switch (newVal) {
        case "LuckyCat-app-sunrise":
            activeVal.value = 1;
            break;
        case "LuckyCat-app-garden":
            activeVal.value = 2;
            break;
        default:
            break;
    }
})

initial();

function initial() {
    familyID.value = localStorage.getItem("familyID");
    identity.value = Number(localStorage.getItem("identity"));
    if (familyID.value && identity.value) {
        FamilyService.findOneByFamilyUID(familyID.value).then(res => {
            credit.value = res.data.result.credit;
            startTime.value = res.data.result.startTime;
            endTime.value = res.data.result.endTime;
            if (res.data.todayRecord) {
                hasCredit.value = true;
            } else {
                const now = Date.now();
                const deadline = new Date();
                deadline.setHours(
                    Number(endTime.value.split(":")[0]),
                    Number(endTime.value.split(":")[1]),
                    0,
                    0
                );
                if (now > deadline) {
                    isLate.value = true;
                }
            }
            switch (router.currentRoute.value.name) {
                case "LuckyCat-app-sunrise":
                    activeVal.value = 1;
                    break;
                case "LuckyCat-app-garden":
                    activeVal.value = 2;
                    break;
                default:
                    break;
            }
            readyRender.value = true;
        })
    } else {
        router.push({ name: 'LuckyCat-app-landing' });
        localStorage.removeItem("familyID");
        localStorage.removeItem("identity");
    }
}

function handleRouterChange(name) {
    router.push({ name })
}


function getCredit(data) {
    credit.value = data;
}

function getStartTime(data) {
    startTime.value = data;
}

function getEndTime(data) {
    endTime.value = data;
}

function getHasCredit(data) {
    hasCredit.value = data;
}
</script>

<template>
    <div v-if="readyRender" class="app__container">
        <div class="app__inner">
            <router-view v-slot="{ Component }" :familyID="familyID" :identity="identity" :credit="credit"
                :startTime="startTime" :endTime="endTime" :hasCredit="hasCredit" :isLate="isLate" @getCredit="getCredit"
                @getStartTime="getStartTime" @getEndTime="getEndTime" @getHasCredit="getHasCredit">
                <transition mode="out-in">
                    <component :is="Component" />
                </transition>
            </router-view>
            <div class="bottomMenu">
                <n-grid :justify="'space-between'">
                    <n-gi :span="12" class="buttonContainer" @click="handleRouterChange('LuckyCat-app-sunrise')"
                        :style="{ color: activeVal === 1 ? '#000000' : '#00000030' }">
                        <div>
                            <n-icon :size="32">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path
                                            d="M3.64 15h8.043c.858 0 1.553-.696 1.553-1.554V6.914c1.407-.101 2.236-1.676 1.475-2.905l-.435-.702a1.904 1.904 0 0 0-1.619-.902h-1.176v-.483A.921.921 0 0 0 10.56 1a2.186 2.186 0 0 0-2.186 2.186v2.936c-1.096.123-1.93.652-2.542 1.388c-.688.826-1.09 1.899-1.33 2.924a14.837 14.837 0 0 0-.35 2.814c-.01.292-.01.548-.008.752h-.503a1.642 1.642 0 0 1-1.2-2.763l.797-.855a3.177 3.177 0 0 0-.076-4.412l-.782-.783a.5.5 0 1 0-.707.707l.783.783A2.176 2.176 0 0 1 2.508 9.7l-.798.855A2.643 2.643 0 0 0 3.64 15zm6.841-12.997v.902a.5.5 0 0 0 .5.5h1.676c.313 0 .604.162.77.429l.435.702a.905.905 0 0 1-.77 1.383h-.355a.5.5 0 0 0-.5.5v7.027a.554.554 0 0 1-.554.554h-.553v-.554a2.607 2.607 0 0 0-2.607-2.608h-.878a.5.5 0 0 0 0 1h.878c.887 0 1.607.72 1.607 1.608V14H5.144c-.003-.193-.002-.437.007-.719c.024-.722.105-1.675.325-2.62c.222-.952.577-1.855 1.124-2.511c.531-.638 1.25-1.055 2.274-1.055a.5.5 0 0 0 .5-.5V3.186c0-.628.489-1.143 1.107-1.183z"
                                            fill="currentColor"></path>
                                    </g>
                                </svg>
                            </n-icon>
                        </div>
                        <div class="buttonText">Lucky Cat</div>
                    </n-gi>
                    <n-gi :span="12" class="buttonContainer" @click="handleRouterChange('LuckyCat-app-garden')"
                        :style="{ color: activeVal === 2 ? '#000000' : '#00000030' }">
                        <div>
                            <n-icon :size="32">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 16 16">
                                    <g fill="none">
                                        <path
                                            d="M9 9.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2zm1 1.5h1v-1h-1v1zM4.188 1.11l-2.5 2c-.166.132-.188.36-.188.56V5.5c0 .563.186 1.082.5 1.5v7.5a.5.5 0 0 0 .5.5h11a.5.5 0 0 0 .5-.5V7c.314-.418.5-.937.5-1.5V3.666c0-.2-.022-.424-.188-.556l-2.5-2A.5.5 0 0 0 11.5 1h-7a.5.5 0 0 0-.312.11zM5.5 4v1.5a1.5 1.5 0 1 1-3 0V4h3zm4 0v1.5a1.5 1.5 0 1 1-3 0V4h3zm4 0v1.5a1.5 1.5 0 0 1-3 0V4h3zM6.029 2l-.375 1H3.425l1.25-1H6.03zm.693 1l.375-1H8.89l.333 1H6.722zm3.222-1h1.38l1.25 1h-2.297l-.333-1zM13 7.792V14H8V9.5a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5V14H3V7.792A2.496 2.496 0 0 0 6 7c.456.607 1.182 1 2 1c.818 0 1.544-.393 2-1a2.496 2.496 0 0 0 3 .792zM7 14H5v-4h2v4z"
                                            fill="currentColor"></path>
                                    </g>
                                </svg>
                            </n-icon>
                        </div>
                        <div class="buttonText">Shop</div>
                    </n-gi>
                </n-grid>
            </div>
        </div>
    </div>
    <n-flex v-else class="app__container" :justify="'center'" :align="'center'">
        <n-flex vertical :size="24">
            <n-spin :size="64">
            </n-spin>
            <div><b>LOADING...</b></div>
        </n-flex>
    </n-flex>
</template>

<style lang='less' scoped>
.app__container {
    height: 100vh;
    width: 100vw;

    .app__inner {
        position: relative;
        height: 100%;
        width: 100%;

        .bottomMenu {
            position: absolute;
            width: 100%;
            bottom: 0;
            z-index: 30;
            background: rgba(255, 255, 255, 0.6);
            backdrop-filter: blur(15px);
            -webkit-text-size-adjust: 100% !important;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;

            .buttonContainer {
                padding: 12px;
                text-align: center;
            }

            .buttonText {
                font-size: 18px;
                -webkit-text-size-adjust: 100% !important;
                -webkit-text-size-adjust: none;
                -ms-text-size-adjust: none;
            }
        }
    }
}
</style>