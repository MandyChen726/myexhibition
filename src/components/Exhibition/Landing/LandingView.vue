<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios';

const artworks = ref([]);

const currentImage = ref(null);

const currentIndex = ref(null);

const opacity = ref('0.4')

const description = `
I'm a remarkably gifted teenage painter whose work already demonstrates a maturity and confidence
well beyond her years. From early on, she showed an intuitive understanding of color, composition, and
balance—qualities.`

onMounted(() => {
    initial();
})

watch(currentIndex, newVal => {
    console.log(currentImage)
})

async function initial() {
    const buffer = await readJSON();
    artworks.value = buffer.data;
    artworks.value.forEach(item => {
        const img = new Image()
        img.src = item.paintingURL
        img.onload = () => {
            item.orientation = img.naturalWidth > img.naturalHeight
                ? 'landscape'
                : 'portrait'
        }
    })
}

function readJSON() {
    return axios('/myexhibition/json/gallery-2.json')
}

function handleRenderArtwork(index) {
    currentIndex.value = index;
}
</script>

<template>
    <n-layout style="position: relative; font-family: 'IBM Plex Mono', monospace" has-sider>
        <n-layout-sider @click="currentIndex = null"
            :style="{ opacity: currentIndex == null ? '1' : opacity, cursor: 'pointer' }" :width="'5rem'">
            <div class="rotated-text">
                {{ description.toUpperCase() }}
            </div>
        </n-layout-sider>
        <n-layout-content>
            <transition mode="out-in">
                <div v-if="currentIndex == null" class="content">
                    <div class="content-inner">
                        <div>{{ "Mandy Chen".toUpperCase() }}</div>
                        <div>{{ "[Student]".toUpperCase() }}</div>
                        <br />
                        <div>{{ "International School of Beijing".toUpperCase() }}</div>
                        <br />
                        <div>{{ "Contact & Follow me".toUpperCase() }}</div>
                        <div>{{ "[mandychen307@gmail.com]".toUpperCase() }}</div>
                        <div>{{ "INSTAGRAM".toUpperCase() }}</div>
                    </div>
                </div>
                <div class="artwork-content" v-else>
                    <n-flex class="image-content" vertical :size="24">
                        <n-flex vertical :size="12">
                            <div>[{{ currentIndex + 1 }}]</div>
                            <n-flex vertical>
                                <div>{{ artworks[currentIndex].label }}</div>
                                <n-flex :justify="'center'" :size="48">
                                    <div v-for="type in artworks[currentIndex].types" style="font-size: 0.6rem">
                                        [{{ type }}]
                                    </div>
                                </n-flex>
                            </n-flex>
                        </n-flex>
                        <n-flex :justify="'center'">
                            <div v-if="artworks[currentIndex].paintingURL.length">
                                <n-image ref="currentImage" style="box-shadow: var(--boxShadow-light);"
                                    :width="artworks[currentIndex].orientation === 'landscape' ? 540 : 360"
                                    :src="artworks[currentIndex].paintingURL"></n-image>
                            </div>
                        </n-flex>
                        <n-flex class="description" vertical>
                            <n-flex :justify="'space-between'" style="font-size: 0.6rem">
                                <div>{{ artworks[currentIndex].date }}</div>
                                <n-flex>
                                    <div v-for="size in artworks[currentIndex].size">
                                        {{ size }}
                                    </div>
                                </n-flex>
                            </n-flex>
                            <n-ellipsis :line-clamp="2">
                                {{ artworks[currentIndex].description }}
                                <template #tooltip>
                                    <div style="max-width: 360px">
                                        {{ artworks[currentIndex].description }}
                                    </div>
                                </template>
                            </n-ellipsis>
                        </n-flex>
                    </n-flex>
                </div>
            </transition>
        </n-layout-content>
        <div :style="{ opacity: currentIndex == null ? '1' : opacity }" class="right-siderbar">
            <n-flex vertical :size="18">
                <div class="artwork-container" v-for="(artwork, index) in artworks" @click="handleRenderArtwork(index)">
                    <n-flex :align="'end'">
                        <div>[{{ index + 1 }}]</div>
                        <img :src="artwork.paintingURL" />
                    </n-flex>
                </div>
            </n-flex>
        </div>
    </n-layout>
</template>

<style lang='less' scoped>
.n-layout-sider {
    position: fixed;
    height: 100vh;

    .rotated-text {
        position: fixed;
        transform: rotate(-90deg) translateX(-100%);
        transform-origin: left top;
        width: calc(100vh - 4rem);
        padding: 2rem;
    }
}

.content {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .content-inner {
        text-align: center;
    }
}

.artwork-content {
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    font-size: 0.8rem;

    .image-content {
        img {
            width: 480px;
            max-width: 100%;
        }
    }

    .description {
        width: 360px;
        margin: 0 auto;
        text-align: left;
    }
}

.right-siderbar {
    max-height: calc(100vh);
    position: absolute;
    right: 0;
    top: 0;
    bottom: 0;
    overflow-y: auto;
    padding: 2rem;
    box-sizing: border-box;
    z-index: 10;
}

.artwork-container {
    cursor: pointer;

    img {
        width: 8rem;
        object-fit: cover;
        aspect-ratio: 1/1;
    }
}
</style>