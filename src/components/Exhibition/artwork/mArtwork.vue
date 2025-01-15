<script setup>
import { ref, watch } from 'vue'

const emits = defineEmits(["getAction"])

const props = defineProps({
    artworks: Array,
    curArtwork: Object
})

const readyRender = ref(false);

if (props.curArtwork) {
    initial();
}

watch(() => props.curArtwork, newVal => {
    readyRender.value = false;
    setTimeout(() => {
        if (newVal) {
            initial()
        }
    }, 200);
})

function initial() {
    readyRender.value = true;
}

function handleLastNext(action) {
    emits("getAction", action)
}
</script>

<template>
    <transition>
        <div v-if="readyRender" class="artwork_container" :style="{
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 25%, rgba(255, 255, 255, 1) 100%), url(${curArtwork.paintingURL})`
        }">
            <n-scrollbar style="max-height: calc(100vh - 70px - 96px)">
                <div style="position: relative; padding: 24px; z-index: 2;">
                    <n-flex vertical :size="24">
                        <div class="label">
                            <b>{{ curArtwork.label }}</b>
                        </div>
                        <div class="date">
                            <b>{{ curArtwork.date }}</b>
                        </div>
                        <div class="painting">
                            <n-image :src="curArtwork.paintingURL"></n-image>
                        </div>
                        <n-flex vertical :size="24">
                            <n-flex vertical>
                                <div style="font-size: 24px"><b>Mandy Chen</b></div>
                                <n-text :depth="3">Painter</n-text>
                            </n-flex>
                            <n-flex vertical :size="48">
                                <div>{{ curArtwork.description }}</div>
                                <n-grid :x-gap="12" style="align-items: center;">
                                    <n-gi :span="8">
                                        <div v-for="type in curArtwork.types" class="types" style="font-size: 12px">
                                            <div>{{ type.toUpperCase() }}</div>
                                        </div>
                                    </n-gi>
                                    <n-gi :span="16">
                                        <div v-for="s in curArtwork.size" class="size"
                                            style="font-size: 12px; text-align: right;">
                                            <div>{{ s.toUpperCase() }}</div>
                                        </div>
                                    </n-gi>
                                </n-grid>
                            </n-flex>
                        </n-flex>
                    </n-flex>
                </div>
            </n-scrollbar>
            <div class="footer">
                <n-flex class="footerInner" :justify="'space-between'" :align="'center'">
                    <n-button text style="font-size: 48px" @click="handleLastNext(0)">
                        <n-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 48 48">
                                <g fill="none">
                                    <path
                                        d="M24.134 32.634a1.25 1.25 0 0 0 0-1.768l-5.616-5.616H32.75a1.25 1.25 0 1 0 0-2.5H18.518l5.616-5.616a1.25 1.25 0 0 0-1.768-1.768l-7.75 7.75a1.25 1.25 0 0 0 0 1.768l7.75 7.75a1.25 1.25 0 0 0 1.768 0zM24 44c11.046 0 20-8.954 20-20S35.046 4 24 4S4 12.954 4 24s8.954 20 20 20zm17.5-20c0 9.665-7.835 17.5-17.5 17.5S6.5 33.665 6.5 24S14.335 6.5 24 6.5S41.5 14.335 41.5 24z"
                                        fill="currentColor"></path>
                                </g>
                            </svg>
                        </n-icon>
                    </n-button>
                    <div>
                        <n-flex :align="'center'">
                            <n-text :depth="3">...</n-text>
                            <n-text :depth="3">
                                {{ (curArtwork.id - 1 < 10 && curArtwork.id - 1 != 0 ? "0" : "") + (curArtwork.id === 1 ?
                                    artworks.length : curArtwork.id - 1) }} </n-text>
                                    <n-text style="font-size: 24px">
                                        <b>{{ (curArtwork.id < 10 ? "0" : "") + curArtwork.id }}</b>
                                    </n-text>
                                    <n-text :depth="3">
                                        {{ (curArtwork.id + 1 < 10 || curArtwork.id + 1 > artworks.length ? "0" : "") +
                                            (curArtwork.id === artworks.length ? 1 : curArtwork.id + 1) }}
                                    </n-text>
                                    <n-text :depth="3">...</n-text>
                        </n-flex>
                    </div>
                    <n-button text style="font-size: 48px" @click="handleLastNext(1)">
                        <n-icon>
                            <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                                viewBox="0 0 48 48">
                                <g fill="none">
                                    <path
                                        d="M23.866 15.366a1.25 1.25 0 0 0 0 1.768l5.616 5.616H15.25a1.25 1.25 0 1 0 0 2.5h14.232l-5.616 5.616a1.25 1.25 0 0 0 1.768 1.768l7.75-7.75a1.25 1.25 0 0 0 0-1.768l-7.75-7.75a1.25 1.25 0 0 0-1.768 0zM24 4C12.954 4 4 12.954 4 24s8.954 20 20 20s20-8.954 20-20S35.046 4 24 4zM6.5 24c0-9.665 7.835-17.5 17.5-17.5S41.5 14.335 41.5 24S33.665 41.5 24 41.5S6.5 33.665 6.5 24z"
                                        fill="currentColor"></path>
                                </g>
                            </svg>
                        </n-icon>
                    </n-button>
                </n-flex>
            </div>
        </div>
    </transition>
</template>

<style lang='less' scoped>
.artwork_container {
    height: calc(100vh - 70px);
    position: relative;
    background-size: cover;
    background-position: center;
    -webkit-text-size-adjust: 100% !important;
    -webkit-text-size-adjust: none;
    -ms-text-size-adjust: none;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.5);
        backdrop-filter: blur(12px);
        z-index: 1;
    }

    .label {
        font-size: 32px;
        line-height: 1;
        -webkit-text-size-adjust: 100% !important;
        -webkit-text-size-adjust: none;
        -ms-text-size-adjust: none;
    }

    .painting {

        :deep(img) {
            width: 100%;
            object-fit: contain !important;
            -webkit-text-size-adjust: 100% !important;
            -webkit-text-size-adjust: none;
            -ms-text-size-adjust: none;
        }
    }

    .footer {
        position: absolute;
        width: 100%;
        bottom: 0;
        z-index: 2;

        .footerInner {
            padding: 24px;
        }
    }
}
</style>