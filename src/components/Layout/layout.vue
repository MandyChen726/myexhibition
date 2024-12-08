<script setup>
import { ref } from 'vue'
import router from '../../router/router'
import store from '../../store/store';

const isApp = router.currentRoute.value.name.includes('app')
</script>

<template>
    <n-layout class="container">
        <n-layout-header v-if="!isApp" class="header">
            <n-flex :align="'center'" :justify="'space-between'">
                <n-flex :align="'center'" class="logo" @click="router.push({ name: 'SunRiseGarden-home' })">
                    <!-- <n-avatar :width="24" src="./myexhibition/LuckyCat/logo.jpg"></n-avatar> -->
                    <b>
                        Mandy's Morning
                        <span class="primaryColor">Cat</span>
                    </b>
                </n-flex>
                <n-flex :size="24">
                    <n-button text @click="router.push({ name: 'SunRiseGarden-mission' })">
                        Mission
                    </n-button>
                    <n-button text @click="router.push({ name: 'SunRiseGarden-development' })">
                        Development History
                    </n-button>
                    <n-button text @click="router.push({ name: 'SunRiseGarden-about' })">
                        About
                    </n-button>
                </n-flex>
            </n-flex>
        </n-layout-header>
        <n-config-provider :theme="store.state.display.theme">
            <n-layout-content>
                <router-view />
            </n-layout-content>
        </n-config-provider>
        <n-layout-footer v-if="!isApp">
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