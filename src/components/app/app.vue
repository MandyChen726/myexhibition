<script setup>
import { ref, Transition, watch } from 'vue'
import {
    darkTheme
} from "naive-ui";
import axios from 'axios';
import store from '../../store/store';
import router from '../../router/router';
import FamilyService from '../../api/family/family.services';

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
        case "SunRiseGarden-app-sunrise":
            activeVal.value = 1;
            break;
        case "SunRiseGarden-app-garden":
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
                case "SunRiseGarden-app-sunrise":
                    activeVal.value = 1;
                    break;
                case "SunRiseGarden-app-garden":
                    activeVal.value = 2;
                    break;
                default:
                    break;
            }
            readyRender.value = true;
        })
    } else {
        router.push({ name: 'SunRiseGarden-app-landing' });
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
                    <n-gi :span="12" class="buttonContainer" @click="handleRouterChange('SunRiseGarden-app-sunrise')"
                        :style="{ color: activeVal === 1 ? '#000000' : '#00000030' }">
                        <div>
                            <n-icon :size="56">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M6.05 4.14l-.39-.39a.993.993 0 0 0-1.4 0l-.01.01a.984.984 0 0 0 0 1.4l.39.39c.39.39 1.01.39 1.4 0l.01-.01a.984.984 0 0 0 0-1.4zM3.01 10.5H1.99c-.55 0-.99.44-.99.99v.01c0 .55.44.99.99.99H3c.56.01 1-.43 1-.98v-.01c0-.56-.44-1-.99-1zm9-9.95H12c-.56 0-1 .44-1 .99v.96c0 .55.44.99.99.99H12c.56.01 1-.43 1-.98v-.97c0-.55-.44-.99-.99-.99zm7.74 3.21c-.39-.39-1.02-.39-1.41-.01l-.39.39a.984.984 0 0 0 0 1.4l.01.01c.39.39 1.02.39 1.4 0l.39-.39a.984.984 0 0 0 0-1.4zm-1.81 15.1l.39.39a.996.996 0 1 0 1.41-1.41l-.39-.39a.993.993 0 0 0-1.4 0c-.4.4-.4 1.02-.01 1.41zM20 11.49v.01c0 .55.44.99.99.99H22c.55 0 .99-.44.99-.99v-.01c0-.55-.44-.99-.99-.99h-1.01c-.55 0-.99.44-.99.99zM12 5.5c-3.31 0-6 2.69-6 6s2.69 6 6 6s6-2.69 6-6s-2.69-6-6-6zm-.01 16.95H12c.55 0 .99-.44.99-.99v-.96c0-.55-.44-.99-.99-.99h-.01c-.55 0-.99.44-.99.99v.96c0 .55.44.99.99.99zm-7.74-3.21c.39.39 1.02.39 1.41 0l.39-.39a.993.993 0 0 0 0-1.4l-.01-.01a.996.996 0 0 0-1.41 0l-.39.39c-.38.4-.38 1.02.01 1.41z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                        </div>
                        <div class="buttonText">Sunrise</div>
                    </n-gi>
                    <n-gi :span="12" class="buttonContainer" @click="handleRouterChange('SunRiseGarden-app-garden')"
                        :style="{ color: activeVal === 2 ? '#000000' : '#00000030' }">
                        <div>
                            <n-icon :size="56">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M64 96H0c0 123.7 100.3 224 224 224v144c0 8.8 7.2 16 16 16h32c8.8 0 16-7.2 16-16V320C288 196.3 187.7 96 64 96zm384-64c-84.2 0-157.4 46.5-195.7 115.2c27.7 30.2 48.2 66.9 59 107.6C424 243.1 512 147.9 512 32h-64z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                        </div>
                        <div class="buttonText">Garden</div>
                    </n-gi>
                </n-grid>
            </div>
        </div>
    </div>
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

            .buttonContainer {
                padding: 12px;
                text-align: center;
            }

            .buttonText {
                font-size: 22px;
            }
        }
    }
}
</style>