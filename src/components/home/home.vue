<script setup>
import { ref } from 'vue'

const count = ref(0)
</script>

<template>
    <div class="content">
        <n-flex class="block1" :align="'center'">
            <div style="margin-top: -87px">
                <n-grid style="align-items: center;">
                    <n-gi :span="12">
                        <n-flex :justify="'center'">
                            <n-image :width="220" src="./myexhibition/SunRiseGarden/home/app-home.png"
                                preview-disabled></n-image>
                        </n-flex>
                    </n-gi>
                    <n-gi :span="12">
                        <div>
                            <div class="slogan">
                                Your Ultimate Wake-Up Tool -
                                Transform from a Night Owl to an Early Bird!
                            </div>
                            <div class="subtitle">Start your day right with our rewards-based system. Scan, score, and
                                earn exciting prizes—make waking up a habit you’ll love!</div>
                        </div>
                        <n-qr-code style="padding: 0; margin: 24px 0"
                            :value="'https://mandychen.hillcodex.com/#/app/landing'" />
                        <div>
                            <n-button type="primary" class="startBtn" @click="handleDownload(block2)">
                                Start Here
                            </n-button>
                        </div>
                    </n-gi>
                </n-grid>
            </div>
        </n-flex>
    </div>
</template>

<style lang="less" scoped>
.content {
    width: 1200px;
    margin: 0 auto;
    padding: 24px;

    .n-image {
        border-radius: 3px;
    }

    .block1 {
        min-height: calc(100vh - 87px - 48px);

        .n-image {
            border: 2px solid black;
            box-shadow: var(--boxShadow-deep);
            border-radius: 20px;
        }

        .slogan {
            font-size: 32px;
            font-weight: bold;
            line-height: 1.4;
        }

        .subtitle {
            margin-top: 48px;
            font-size: 18px;
        }

        .startBtn {
            margin-top: 12px;
        }
    }

    .block2 {
        min-height: 100vh;

        .n-grid {
            align-items: center;
        }
    }

    .block3 {
        min-height: 100vh;
    }
}
</style>