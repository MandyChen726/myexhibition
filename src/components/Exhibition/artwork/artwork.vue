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
            backgroundImage: `linear-gradient(to bottom, rgba(255, 255, 255, 1) 0%, rgba(255, 255, 255, 0) 50%, rgba(255, 255, 255, 1) 80%), url(${curArtwork.paintingURL[0]})`
        }">
            <div style="position: relative; padding: 24px; z-index: 2;">
                <n-grid :x-gap="48">
                    <n-gi v-if="curArtwork.left" :span="curArtwork.span[1]" class="painting">
                        <div class="painting" v-if="curArtwork.paintingURL.length == 1">
                            <n-image :src="curArtwork.paintingURL[0]"></n-image>
                        </div>
                        <div class="painting" v-else-if="curArtwork.paintingURL.length > 1" style="background: #000;">
                            <n-carousel show-arrow draggable dot-type="line" dot-placement="right">
                                <n-image v-for="url in curArtwork.paintingURL" ref="currentImage" :src="url"></n-image>
                            </n-carousel>
                        </div>
                    </n-gi>
                    <n-gi v-else :span="curArtwork.span[0]">
                        <n-flex vertical style="position: relative; height: calc(100vh - 77px - 96px - 48px);">
                            <n-grid :x-gap="12">
                                <n-gi :span="20">
                                    <n-flex vertical :size="64">
                                        <div class="label">
                                            <b>{{ curArtwork.label }}</b>
                                        </div>
                                        <n-grid :x-gap="12">
                                            <n-gi :span="6">
                                                <div class="date">
                                                    <b>{{ curArtwork.date }}</b>
                                                </div>
                                            </n-gi>
                                            <n-gi :span="18">
                                                <div>{{ curArtwork.description }}</div>
                                            </n-gi>
                                        </n-grid>
                                    </n-flex>
                                </n-gi>
                                <n-gi :span="4">
                                    <div v-for="type in curArtwork.types" style="text-align: right; font-size: 12px">
                                        <div>{{ type.toUpperCase() }}</div>
                                    </div>
                                </n-gi>
                            </n-grid>
                            <n-grid style="position: absolute; bottom: 0; align-items: end;">
                                <n-gi :span="16">
                                    <div style="font-size: 24px"><b>Mandy Chen</b></div>
                                    <n-text :depth="3">Painter</n-text>
                                </n-gi>
                                <n-gi :span="8">
                                    <div v-for="s in curArtwork.size" style="text-align: right;">
                                        <div>{{ s.toUpperCase() }}</div>
                                    </div>
                                </n-gi>
                            </n-grid>
                        </n-flex>
                    </n-gi>
                    <n-gi v-if="!curArtwork.left" :span="curArtwork.span[1]">
                        <div class="painting" v-if="curArtwork.paintingURL.length == 1">
                            <n-image :src="curArtwork.paintingURL[0]"></n-image>
                        </div>
                        <div class="painting" v-else-if="curArtwork.paintingURL.length > 1" style="background: #000;">
                            <n-carousel show-arrow draggable dot-type="line" dot-placement="right">
                                <n-image v-for="url in curArtwork.paintingURL" ref="currentImage" :src="url"></n-image>
                            </n-carousel>
                        </div>
                    </n-gi>
                    <n-gi v-else :span="curArtwork.span[0]">
                        <n-flex vertical style="position: relative; height: calc(100vh - 77px - 96px - 48px);">
                            <n-grid :x-gap="12">
                                <n-gi :span="20">
                                    <n-flex vertical :size="64">
                                        <div class="label">
                                            <b>{{ curArtwork.label }}</b>
                                        </div>
                                        <n-grid :x-gap="12">
                                            <n-gi :span="6">
                                                <div class="date">
                                                    <b>{{ curArtwork.date }}</b>
                                                </div>
                                            </n-gi>
                                            <n-gi :span="18">
                                                <div>{{ curArtwork.description }}</div>
                                            </n-gi>
                                        </n-grid>
                                    </n-flex>
                                </n-gi>
                                <n-gi :span="4">
                                    <div v-for="type in curArtwork.types" style="text-align: right; font-size: 12px">
                                        <div>{{ type.toUpperCase() }}</div>
                                    </div>
                                </n-gi>
                            </n-grid>
                            <n-grid style="position: absolute; bottom: 0; align-items: end;">
                                <n-gi :span="8">
                                    <div v-for="s in curArtwork.size">
                                        <div>{{ s.toUpperCase() }}</div>
                                    </div>
                                </n-gi>
                                <n-gi :span="16" style="text-align: right;">
                                    <div style="font-size: 24px"><b>Mandy Chen</b></div>
                                    <n-text :depth="3">Painter</n-text>
                                </n-gi>
                            </n-grid>
                        </n-flex>
                    </n-gi>
                </n-grid>
            </div>
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
    height: calc(100vh - 77px);
    position: relative;
    background-size: cover;
    background-position: center;

    &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(12px);
        z-index: 1;
    }

    .label {
        font-size: 56px;
        line-height: 1;
    }

    .painting {
        height: calc(100vh - 77px - 96px - 48px);

        :deep(img) {
            width: 100%;
            object-fit: contain !important
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