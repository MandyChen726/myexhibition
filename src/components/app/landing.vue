<script setup>
import { ref } from 'vue'
import router from '../../router/router';
import FamilyServices from '../../api/family/family.services';
import {
    useMessage
} from 'naive-ui';

const message = useMessage();

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);

const familyID = ref(null);

const stage = ref(0);

const identity = ref(0);

const loading = ref(false);

const identitySelectStyle = {
    border: "4px solid #000",
    width: "calc(100% - 6px)",
    padding: "45px 0",
    opacity: "1",
}

initial();

function initial() {
    const familyIDBuffer = localStorage.getItem("familyID");
    if (familyIDBuffer) {
        stage.value = 1;
        familyID.value = familyIDBuffer;
    }
}

function handleContinue() {
    if (familyID.value) {
        if (isFourDigitNumber(familyID.value)) {
            loading.value = true;
            FamilyServices.findOneByFamilyUID(familyID.value)
                .then(res => {
                    const code = res.data.code;
                    switch (code) {
                        case 200:
                            stage.value = 1;
                            localStorage.setItem("familyID", familyID.value);
                            break;
                        case 404:
                            message.error("This family ID does not exist");
                            break;
                        default:
                            break;
                    }
                    loading.value = false;
                })
        } else {
            message.warning("Your family ID must be a 4-digit number");
        }
    } else {
        message.warning("Please enter your 4-digit family ID");
    }
}

function handleIdentityContinue() {
    localStorage.setItem("identity", identity.value);
    router.push({ name: 'SunRiseGarden-app-sunrise' });
}

function handleCreateFamilyID() {
    familyID.value = generateRandom4DigitID();
    loading.value = true;
    FamilyServices.create({ familyUID: familyID.value, credit: 0, startTime: "07:00", endTime: "07:30" })
        .then(res => {
            localStorage.setItem("familyID", res.data.familyUID);
            stage.value = 1;
            loading.value = false;
        })
}

function generateRandom4DigitID() {
    return Math.floor(1000 + Math.random() * 9000);
}

function isFourDigitNumber(familyID) {
    return familyID.length === 4;
}
</script>

<template>
    <div v-if="!loading">
        <div v-if="!stage" class="landingContainer">
            <div class="banner">
                <div class="view">
                    <div class="sky">
                        <div class="sun"></div>
                        <div class="ground"></div>
                        <div class="family">
                            <n-icon :size="12">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54c-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                            <n-icon :size="32">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 24 24">
                                    <path
                                        d="M16 4c0-1.11.89-2 2-2s2 .89 2 2s-.89 2-2 2s-2-.89-2-2zm4 18v-6h2.5l-2.54-7.63A2.01 2.01 0 0 0 18.06 7h-.12a2 2 0 0 0-1.9 1.37l-.86 2.58c1.08.6 1.82 1.73 1.82 3.05v8h3zm-7.5-10.5c.83 0 1.5-.67 1.5-1.5s-.67-1.5-1.5-1.5S11 9.17 11 10s.67 1.5 1.5 1.5zM5.5 6c1.11 0 2-.89 2-2s-.89-2-2-2s-2 .89-2 2s.89 2 2 2zm2 16v-7H9V9c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v6h1.5v7h4zm6.5 0v-4h1v-4c0-.82-.68-1.5-1.5-1.5h-2c-.82 0-1.5.68-1.5 1.5v4h1v4h3z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                            <n-icon :size="12">
                                <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                    viewBox="0 0 512 512">
                                    <path
                                        d="M290.59 192c-20.18 0-106.82 1.98-162.59 85.95V192c0-52.94-43.06-96-96-96c-17.67 0-32 14.33-32 32s14.33 32 32 32c17.64 0 32 14.36 32 32v256c0 35.3 28.7 64 64 64h176c8.84 0 16-7.16 16-16v-16c0-17.67-14.33-32-32-32h-32l128-96v144c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V289.86c-10.29 2.67-20.89 4.54-32 4.54c-61.81 0-113.52-44.05-125.41-102.4zM448 96h-64l-64-64v134.4c0 53.02 42.98 96 96 96s96-42.98 96-96V32l-64 64zm-72 80c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16zm80 0c-8.84 0-16-7.16-16-16s7.16-16 16-16s16 7.16 16 16s-7.16 16-16 16z"
                                        fill="currentColor"></path>
                                </svg>
                            </n-icon>
                        </div>
                    </div>
                </div>
            </div>
            <n-flex class="userInput" :align="'center'">
                <n-flex style="width: 100%; margin-top: -128px" vertical :size="24">
                    <div class="formLabel"><b>Join a Family</b></div>
                    <div>
                        <n-input size="large" maxlength="4" :allow-input="onlyAllowNumber" v-model:value="familyID"
                            round placeholder="Enter your 4-digit family ID">
                            <template #prefix>
                                <n-icon>
                                    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                        viewBox="0 0 20 20">
                                        <g fill="none">
                                            <path
                                                d="M15 6a1 1 0 1 1-2 0a1 1 0 0 1 2 0zm-2.5-4C9.424 2 7 4.424 7 7.5c0 .397.04.796.122 1.175c.058.27-.008.504-.142.638l-4.54 4.54A1.5 1.5 0 0 0 2 14.915V16.5A1.5 1.5 0 0 0 3.5 18h2A1.5 1.5 0 0 0 7 16.5V16h1a1 1 0 0 0 1-1v-1h1a1 1 0 0 0 1-1v-.18c.493.134 1.007.18 1.5.18c3.076 0 5.5-2.424 5.5-5.5S15.576 2 12.5 2zM8 7.5C8 4.976 9.976 3 12.5 3S17 4.976 17 7.5S15.024 12 12.5 12c-.66 0-1.273-.095-1.776-.347A.5.5 0 0 0 10 12.1v.9H9a1 1 0 0 0-1 1v1H7a1 1 0 0 0-1 1v.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-1.586a.5.5 0 0 1 .146-.353l4.541-4.541c.432-.432.522-1.044.412-1.556A4.619 4.619 0 0 1 8 7.5z"
                                                fill="currentColor"></path>
                                        </g>
                                    </svg>
                                </n-icon>
                            </template>
                        </n-input>
                    </div>
                    <n-button size="large" :loading="loading" style="width: 100%" type="primary" round
                        @click="handleContinue">
                        Continue
                    </n-button>
                    <n-flex :justify="'center'">
                        No family id?
                        <n-button text @click="handleCreateFamilyID" :loading="loading">
                            <u>Create one and continue</u>
                        </n-button>
                    </n-flex>
                </n-flex>
            </n-flex>
        </div>
        <div v-else class="landingContainer">
            <n-text class="familyID" :depth="3">Family ID: {{ familyID }}</n-text>
            <n-flex class="identityContainer" :align="'center'">
                <n-flex class="identityContainer__inner" vertical :size="24">
                    <div>Your identity in the family</div>
                    <div class="identity" @click="identity = 1"
                        :style="identity == 1 ? identitySelectStyle : undefined">
                        <div>
                            Parent
                        </div>
                    </div>
                    <div class="identity" @click="identity = 2"
                        :style="identity == 2 ? identitySelectStyle : undefined">
                        <div>Child</div>
                    </div>
                    <Transition mode="out-in">
                        <n-button v-if="identity" size="large" style="width: 100%" type="primary" round
                            @click="handleIdentityContinue">
                            Continue
                        </n-button>
                        <div v-else style="height: 40px"></div>
                    </Transition>
                </n-flex>
            </n-flex>
        </div>
    </div>
    <n-flex v-else class="landingContainer" :justify="'center'" :align="'center'">
        <n-flex vertical :size="24">
            <n-spin :size="64">
            </n-spin>
            <div><b>LOADING...</b></div>
        </n-flex>
    </n-flex>
</template>

<style lang='less' scoped>
.landingContainer {
    height: 100vh;
    width: 100vw;
    position: relative;

    .banner {
        width: 100%;
        height: 30%;

        .view {
            padding: 24px;
            height: 100%;

            .sky {
                border-radius: 24px;
                width: 100%;
                height: 100%;
                position: relative;
                background: linear-gradient(to bottom, #B0E2FF, #87CEFA 50%, #4682B4);

                .sun {
                    position: absolute;
                    width: 128px;
                    height: 128px;
                    left: calc(15%);
                    top: calc(50% - 64px);
                    background: radial-gradient(circle, #FDB813, #FFB347);
                    border-radius: 50%;
                    z-index: 10;
                    box-shadow: 0 0 40px 10px #ffb84dcc,
                        0 0 80px 20px #ff993399;
                    filter: brightness(1.2);
                }

                .ground {
                    position: absolute;
                    bottom: 0;
                    width: 100%;
                    height: 25%;
                    background: #00a133;
                    border-radius: 50% 50% 24px 24px;
                    z-index: 15;
                }

                .family {
                    width: 100%;
                    position: absolute;
                    bottom: 50px;
                    left: 15%;
                    text-align: center;
                    z-index: 20;
                }
            }
        }
    }

    .userInput {
        padding: 24px;
        height: calc(70% - 48px);

        .formLabel {
            font-size: 36px;
        }
    }

    .identityContainer {
        height: calc(100% - 48px);
        width: 100%;

        .identityContainer__inner {
            width: 100%;
            padding: 24px;
            font-size: 18px;

            .identity {
                text-align: center;
                width: 100%;
                border-radius: 24px;
                border: 1px solid #000;
                font-size: 24px;
                font-weight: bold;
                padding: 48px 0;
                opacity: 0.4;
                transition: all 0.2s ease-in-out;
            }
        }
    }

    .familyID {
        position: absolute;
        top: 24px;
        right: 24px;
    }
}
</style>