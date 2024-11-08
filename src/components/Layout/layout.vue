<script setup>
import { ref } from 'vue'
import router from '../../router/router'
</script>

<template>
    <n-layout class="container">
        <n-layout-header class="header">
            <n-flex :align="'center'" :justify="'space-between'">
                <n-flex :align="'center'" class="logo" @click="router.push({ name: 'early-riser-home' })">
                    <n-avatar :width="24" src="./myexhibition/EarlyRiser/logo.jpg"></n-avatar>
                    <b>
                        Early
                        <span class="primaryColor">Riser</span>
                    </b>
                </n-flex>
                <n-flex :size="24">
                    <n-button text @click="router.push({ name: 'early-riser-mission' })">
                        Mission
                    </n-button>
                    <n-button text @click="router.push({ name: 'early-riser-development' })">
                        Development History
                    </n-button>
                    <n-button text @click="router.push({ name: 'early-riser-about' })">
                        About
                    </n-button>
                </n-flex>
            </n-flex>
        </n-layout-header>
        <n-layout-content>
            <router-view />
        </n-layout-content>
        <n-layout-footer>
            <n-flex :justify="'center'">
                <div>2024 Copyright © <span class="primaryColor">Mandy Chen</span>. All rights reserved.</div>
            </n-flex>
        </n-layout-footer>
    </n-layout>
</template>

<style lang='less' scoped>
.container {
    min-height: 100vh;

    .header {
        padding: 24px;
    }

    .logo {
        font-size: 24px;
        cursor: pointer;
        transition: all 0.2s;

        &:hover {
            opacity: 0.8;
        }
    }

    .n-layout-footer {
        background: rgba(224, 224, 224, 0.2);
        padding: 24px;

        .copyright {
            color: var(--primary-color)
        }
    }
}
</style>