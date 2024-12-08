<script setup>
import { ref, } from 'vue'
import {
    darkTheme,
    useMessage
} from "naive-ui";
import axios from 'axios';
import store from '../../store/store';
import { handleQuit } from './app';
import FamilyService from '../../api/family/family.services';
import RecordService from '../../api/record/record.services';
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
    <div v-if="readyRender" class="sky">
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
        <n-flex vertical :size="12">
            <n-flex :justify="'center'">
                <div class="luckycat">
                    <img class="luckycatImg" src="/myexhibition/LuckyCat/app/luckycat/luckycat.webp" />
                    <div class="credit__display">
                        <n-flex :align="'center'" :justify="'center'" class="credit__count">
                            <div>
                                <div class="label">Current Credit</div>
                                <div
                                    :class="['value', creditChanged ? 'animate__animated' : undefined, creditChanged ? 'animate__rubberBand' : undefined]">
                                    {{ creditBuffer }}
                                </div>
                            </div>
                        </n-flex>
                    </div>
                </div>
            </n-flex>
            <div class="UIBlock">
                <n-flex :justify="'center'" style="height: 100%">
                    <div v-if="identity === 2">
                        <n-flex vertical :size="12">
                            <transition>
                                <div v-if="!hasCredit && !isLate" class="status">
                                    <n-button color="#FFEB3B" size="large" strong @click="handleUpdate(1)"
                                        :loading="creditButtonLoading">
                                        Get Credit
                                    </n-button>
                                </div>
                            </transition>
                            <div class="infoText">
                                <div v-if="!hasCredit && !isLate">
                                    Press this button before {{ endTimeBuffer }} each day to earn 1 credit
                                </div>
                                <div v-else-if="hasCredit">
                                    <div style="font-size: 32px">
                                        AMAZING!<br />
                                        You made it!
                                    </div>
                                </div>
                                <div v-else-if="!hasCredit && isLate">
                                    <div style="font-size: 32px">See you in the morning!</div>
                                    <n-text :depth="3">
                                        Come back between {{ startTimeBuffer }} and {{ endTimeBuffer }}
                                    </n-text>
                                </div>
                            </div>
                        </n-flex>
                    </div>
                </n-flex>
            </div>
        </n-flex>
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
        background: rgba(138, 138, 138, 0.1);
        backdrop-filter: blur(15px);
        padding: 12px;
        margin: 24px;
    }

    .luckycat {
        position: relative;
        width: 80%;
        aspect-ratio: 1 / 1.45;

        .luckycatImg {
            width: 100%;
            height: 100%;
        }

        .credit__display {
            position: absolute;
            bottom: 0;
            width: 83%;
            left: calc(9%);
            aspect-ratio: 1 / 1;

            .credit__count {
                height: 100%;
                text-align: center;
                line-height: 1;
                margin-top: -4px;

                .label {
                    font-size: 18px;
                }

                .value {
                    font-size: 18vw;
                    font-weight: bold;
                }
            }
        }
    }

    .UIBlock {
        width: 100%;
        text-align: center;
        z-index: 20;

        .status {
            .n-button {
                font-size: 32px;
                color: #000;
                padding: 32px 24px;
                box-shadow: var(--boxShadow-regular);
                border-radius: 12px;
            }
        }

        .infoText {
            font-size: 18px;
            padding: 0 24px;
        }
    }
}
</style>