<script setup>
import { ref, } from 'vue'
import {
    useMessage
} from "naive-ui";
import { handleQuit } from './app';
import FamilyService from '../../../api/family/family.services';
import RecordService from '../../../api/record/record.services';
import 'animate.css';

const props = defineProps({
    familyID: String,
    identity: Number,
    credit: Number,
    startTime: String,
    endTime: String,
    hasCredit: Boolean,
    isLate: Boolean,
})

const message = useMessage();

const emit = defineEmits(['getCredit', 'getStartTime', 'getEndTime', 'getHasCredit'])

const creditBuffer = ref(0);

const creditButtonLoading = ref(false);

const creditChanged = ref(false);

const loading = ref(false);

const startTimeBuffer = ref("07:00");

const endTimeBuffer = ref("07:30");

const readyRender = ref(false);

const showTimeRangeModal = ref(false);

const bodyStyle = {
    width: '85vw'
}

const background = ref("linear-gradient(to bottom, #FDB813, #87CEEB)");

const latitude = ref("");

const longitude = ref("");

const now = 1732316893000;

const first_light = ref(0);

const dawn = ref(0);

const sunrise = ref(0);

const sunset = ref(0);

const dusk = ref(0);

const last_light = ref(0);

const parseToMilliseconds = (date, time) => {
    const dateTimeString = `${date} ${time}`;
    return new Date(dateTimeString).getTime();
};

initial();

async function initial() {
    creditBuffer.value = props.credit;
    startTimeBuffer.value = props.startTime;
    endTimeBuffer.value = props.endTime;
    readyRender.value = true;
}

function handleUpdate(action) {
    loading.value = true;
    switch (action) {
        case 1:
            creditButtonLoading.value = true;
            creditBuffer.value++;
            creditChanged.value = true;
            RecordService.create({ action: 1, familyUID: props.familyID })
                .then(res => {
                    emit("getHasCredit", true);
                });
            FamilyService.update(props.familyID, { credit: creditBuffer.value })
                .then(res => {
                    emit("getCredit", creditBuffer.value);
                    loading.value = false;
                });
            break;
        case 2:
            FamilyService.update(props.familyID, { startTime: startTimeBuffer.value })
                .then(res => {
                    emit("getStartTime", startTimeBuffer.value);
                    message.success("最早起床时间修改成功")
                    loading.value = false;
                });
            break;
        case 3:
            FamilyService.update(props.familyID, { endTime: endTimeBuffer.value })
                .then(res => {
                    emit("getEndTime", endTimeBuffer.value);
                    message.success("最晚起床时间修改成功")
                    loading.value = false;
                });
            break;
        default:
            break;
    }
}

function startIsHourDisabled(hour) {
    if (endTimeBuffer.value) {
        const [endHour] = endTimeBuffer.value.split(":");
        if (parseInt(hour) > parseInt(endHour)) {
            return true;
        }
    }
    return false;
}

function startIsMinuteDisabled(minute, selectedHour) {
    if (selectedHour === null) return false;

    const [endHour, endMinute] = endTimeBuffer.value.split(":");
    if (parseInt(selectedHour) === parseInt(endHour)) {
        return parseInt(minute) >= parseInt(endMinute);
    }
    return false;
}

function endIsHourDisabled(hour) {
    if (startTimeBuffer.value) {
        const [startHour] = startTimeBuffer.value.split(":");
        if (parseInt(hour) < parseInt(startHour)) {
            return true;
        }
    }
    return false;
}

function endIsMinuteDisabled(minute, selectedHour) {
    if (selectedHour === null) return false;

    const [startHour, startMinute] = startTimeBuffer.value.split(":");
    if (parseInt(selectedHour) === parseInt(startHour)) {
        return parseInt(minute) < parseInt(startMinute);
    }
    return false;
}
</script>

<template>
    <div v-if="readyRender" class="sky" :style="{ background }">
        <n-modal v-model:show="showTimeRangeModal" class="custom-card" preset="card" :style="bodyStyle" title="设置起床时间"
            size="huge" :bordered="false" :auto-focus="false">
            <n-grid style="align-items: center;">
                <n-gi :span="10" style="text-align: center;">
                    <n-time-picker :actions="[]" :is-hour-disabled="startIsHourDisabled"
                        :is-minute-disabled="startIsMinuteDisabled" size="large" @blur="handleUpdate(2)"
                        v-model:formatted-value="startTimeBuffer" value-format="HH:mm" format="HH:mm"
                        :disabled="loading" />
                </n-gi>
                <n-gi :span="4" style="text-align: center;">-</n-gi>
                <n-gi :span="10" style="text-align: center;">
                    <n-time-picker :actions="[]" :is-hour-disabled="endIsHourDisabled"
                        :is-minute-disabled="endIsMinuteDisabled" size="large" @blur="handleUpdate(3)"
                        v-model:formatted-value="endTimeBuffer" value-format="HH:mm" format="HH:mm"
                        :disabled="loading" />
                </n-gi>
            </n-grid>
        </n-modal>
        <n-flex :justify="'space-between'" :align="'center'">
            <n-flex v-if="identity == 1" class="settingBlock" :align="'center'" @click="showTimeRangeModal = true">
                <n-icon :size="22">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 1024 1024">
                        <path
                            d="M924.8 625.7l-65.5-56c3.1-19 4.7-38.4 4.7-57.8s-1.6-38.8-4.7-57.8l65.5-56a32.03 32.03 0 0 0 9.3-35.2l-.9-2.6a443.74 443.74 0 0 0-79.7-137.9l-1.8-2.1a32.12 32.12 0 0 0-35.1-9.5l-81.3 28.9c-30-24.6-63.5-44-99.7-57.6l-15.7-85a32.05 32.05 0 0 0-25.8-25.7l-2.7-.5c-52.1-9.4-106.9-9.4-159 0l-2.7.5a32.05 32.05 0 0 0-25.8 25.7l-15.8 85.4a351.86 351.86 0 0 0-99 57.4l-81.9-29.1a32 32 0 0 0-35.1 9.5l-1.8 2.1a446.02 446.02 0 0 0-79.7 137.9l-.9 2.6c-4.5 12.5-.8 26.5 9.3 35.2l66.3 56.6c-3.1 18.8-4.6 38-4.6 57.1c0 19.2 1.5 38.4 4.6 57.1L99 625.5a32.03 32.03 0 0 0-9.3 35.2l.9 2.6c18.1 50.4 44.9 96.9 79.7 137.9l1.8 2.1a32.12 32.12 0 0 0 35.1 9.5l81.9-29.1c29.8 24.5 63.1 43.9 99 57.4l15.8 85.4a32.05 32.05 0 0 0 25.8 25.7l2.7.5a449.4 449.4 0 0 0 159 0l2.7-.5a32.05 32.05 0 0 0 25.8-25.7l15.7-85a350 350 0 0 0 99.7-57.6l81.3 28.9a32 32 0 0 0 35.1-9.5l1.8-2.1c34.8-41.1 61.6-87.5 79.7-137.9l.9-2.6c4.5-12.3.8-26.3-9.3-35zM788.3 465.9c2.5 15.1 3.8 30.6 3.8 46.1s-1.3 31-3.8 46.1l-6.6 40.1l74.7 63.9a370.03 370.03 0 0 1-42.6 73.6L721 702.8l-31.4 25.8c-23.9 19.6-50.5 35-79.3 45.8l-38.1 14.3l-17.9 97a377.5 377.5 0 0 1-85 0l-17.9-97.2l-37.8-14.5c-28.5-10.8-55-26.2-78.7-45.7l-31.4-25.9l-93.4 33.2c-17-22.9-31.2-47.6-42.6-73.6l75.5-64.5l-6.5-40c-2.4-14.9-3.7-30.3-3.7-45.5c0-15.3 1.2-30.6 3.7-45.5l6.5-40l-75.5-64.5c11.3-26.1 25.6-50.7 42.6-73.6l93.4 33.2l31.4-25.9c23.7-19.5 50.2-34.9 78.7-45.7l37.9-14.3l17.9-97.2c28.1-3.2 56.8-3.2 85 0l17.9 97l38.1 14.3c28.7 10.8 55.4 26.2 79.3 45.8l31.4 25.8l92.8-32.9c17 22.9 31.2 47.6 42.6 73.6L781.8 426l6.5 39.9zM512 326c-97.2 0-176 78.8-176 176s78.8 176 176 176s176-78.8 176-176s-78.8-176-176-176zm79.2 255.2A111.6 111.6 0 0 1 512 614c-29.9 0-58-11.7-79.2-32.8A111.6 111.6 0 0 1 400 502c0-29.9 11.7-58 32.8-79.2C454 401.6 482.1 390 512 390c29.9 0 58 11.6 79.2 32.8A111.6 111.6 0 0 1 624 502c0 29.9-11.7 58-32.8 79.2z"
                            fill="currentColor"></path>
                    </svg>
                </n-icon>
                <div style="font-size: 18px">{{ endTimeBuffer }}</div>
            </n-flex>
            <div v-else style="height: 53px; padding: 24px"></div>
            <n-flex class="familyID" :align="'center'">
                <n-text>Family ID: {{ familyID }}</n-text>
                <n-icon @click="handleQuit">
                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 32 32">
                        <path
                            d="M6 30h12a2.002 2.002 0 0 0 2-2v-3h-2v3H6V4h12v3h2V4a2.002 2.002 0 0 0-2-2H6a2.002 2.002 0 0 0-2 2v24a2.002 2.002 0 0 0 2 2z"
                            fill="currentColor"></path>
                        <path d="M20.586 20.586L24.172 17H10v-2h14.172l-3.586-3.586L22 10l6 6l-6 6l-1.414-1.414z"
                            fill="currentColor"></path>
                    </svg>
                </n-icon>
            </n-flex>
        </n-flex>
        <div class="sun">
            <n-flex :align="'center'" :justify="'center'" class="sunrise__count">
                <div>
                    <div class="label">My Sunrise</div>
                    <div
                        :class="['value', creditChanged ? 'animate__animated' : undefined, creditChanged ? 'animate__rubberBand' : undefined]">
                        {{ creditBuffer }}
                    </div>
                </div>
            </n-flex>
        </div>
        <div class="ground"></div>
        <div class="family">
            <n-icon :size="18">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512">
                    <path
                        d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54c-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16z"
                        fill="currentColor"></path>
                </svg>
            </n-icon>
            <n-icon :size="64">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 24 24">
                    <path
                        d="M16 4c0-1.11.89-2 2-2s2 .89 2 2s-.89 2-2 2s-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18.06 7h-.12a2 2 0 0 0-1.9 1.37l-.86 2.58c1.08.6 1.82 1.73 1.82 3.05v8h3zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2s-2 .89-2 2s.89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5 0v-4h1v-4c0-.82-.68-1.5-1.5-1.5h-2c-.82 0-1.5.68-1.5 1.5v4h1v4h3z"
                        fill="currentColor"></path>
                </svg>
            </n-icon>
            <n-icon :size="18">
                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                    viewBox="0 0 512 512">
                    <path
                        d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54c-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16z"
                        fill="currentColor"></path>
                </svg>
            </n-icon>
        </div>
        <div class="UIBlock">
            <n-flex :align="'center'" :justify="'center'" style="height: 100%">
                <div v-if="identity === 2">
                    <div class="status">
                        <transition>
                            <n-button v-if="!hasCredit && !isLate" color="white" size="large" strong
                                @click="handleUpdate(1)" :loading="creditButtonLoading">
                                Catch the Sunrise
                            </n-button>
                        </transition>
                    </div>
                    <div class="infoText">
                        <div v-if="!hasCredit && !isLate">
                            Press this button before {{ endTimeBuffer }} every day to catch the sunrise!
                        </div>
                        <div v-else-if="hasCredit">
                            Today's sunrise has been added to your sunrise count that you can use to harvest stuff later
                        </div>
                        <div v-else-if="!hasCredit && isLate">
                            Come back between {{ startTimeBuffer }} and {{ endTimeBuffer }} every day to catch the
                            sunrise!
                        </div>
                    </div>
                </div>
            </n-flex>
        </div>
    </div>
</template>

<style lang='less' scoped>
.sky {
    position: relative;
    height: 100%;
    width: 100%;
    z-index: 5;

    .familyID {
        padding: 24px;
    }

    .settingBlock {
        border-radius: 8px;
        background: rgba(255, 255, 255, 0.6);
        backdrop-filter: blur(15px);
        padding: 12px;
        margin: 24px;
    }

    .sun {
        position: absolute;
        left: calc(50% - 160px);
        top: calc(50% - 160px - 61px - 48px);
        width: 320px;
        height: 320px;
        background: radial-gradient(circle, #FDB813, #FFB347);
        border-radius: 50%;
        z-index: 10;
        box-shadow: 0 0 40px 10px #ffb84dcc,
            0 0 80px 20px #ff993399;
        filter: brightness(1.2);

        .sunrise__count {
            height: 100%;
            text-align: center;
            line-height: 1;
            margin-top: -12px;

            .label {
                font-size: 24px;
            }

            .value {
                font-size: 128px;
                font-weight: bold;
            }
        }
    }

    .ground {
        position: absolute;
        bottom: 0;
        width: 200%;
        left: -50%;
        height: 50%;
        background: #00a133;
        border-radius: 50% 50% 0 0;
        z-index: 15;
    }

    .family {
        height: calc(50% - 122px + 24px);
        width: 100%;
        position: absolute;
        bottom: 122px;
        text-align: center;
        z-index: 20;
    }

    .UIBlock {
        height: calc(50% - 122px);
        width: 100%;
        position: absolute;
        bottom: 122px;
        text-align: center;
        color: white;
        z-index: 20;

        .status {
            .n-button {
                color: #000;
                font-size: 32px;
                padding: 32px 24px;
            }
        }

        .infoText {
            font-size: 20px;
            margin-top: 12px;
            padding: 0 24px;
        }
    }
}
</style>