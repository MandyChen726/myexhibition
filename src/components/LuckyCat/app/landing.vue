<script setup>
import { ref } from 'vue'
import router from '../../../router/router';
import FamilyServices from '../../../api/family/family.services';
import {
    useMessage
} from 'naive-ui';

const message = useMessage();

const onlyAllowNumber = (value) => !value || /^\d+$/.test(value);

const familyID = ref(null);

const stage = ref(0);

const identity = ref(0); // 1: parent 2: child

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
    router.push({ name: 'LuckyCat-app-sunrise' });
}

function handleCreateFamilyID() {
    loading.value = true;
    FamilyServices.create({ credit: 0, startTime: "07:00", endTime: "07:30" })
        .then(res => {
            localStorage.setItem("familyID", res.data.familyUID);
            familyID.value = res.data.familyUID;
            stage.value = 1;
            loading.value = false;
        })
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
                    <div class="background"></div>
                    <div class="sky"></div>
                </div>
            </div>
            <n-flex class="userInput">
                <n-flex style="width: 100%; margin-top: 48px" vertical :size="24">
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
            height: 100%;
            position: relative;

            .background {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background-image: url('/myexhibition/LuckyCat/app/garden/luckycatpattern.webp');
                background-size: cover;
                background-position: center;
            }

            .sky {
                position: relative;
                width: 100%;
                height: 100%;
                backdrop-filter: blur(2px);
                box-shadow: var(--boxShadow-light);
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