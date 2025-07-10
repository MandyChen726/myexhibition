<script setup>
import { onMounted, ref, watch } from 'vue'
import axios from 'axios';

const artworks = ref([]);

const currentImage = ref(null);

const currentIndex = ref(null);

const opacity = ref('0.4')

const showMenu = ref(false);

const description = `
I'm a remarkably gifted teenage painter whose work already demonstrates a maturity and confidence
well beyond her years. From early on, she showed an intuitive understanding of color, composition, and
balance—qualities.`

onMounted(async () => {
    const buffer = await readJSON();
    artworks.value = buffer.data;

    artworks.value.forEach(item => {
        const img = new Image();
        img.src = item.paintingURL[0];
        img.onload = () => {
            item.orientation = img.naturalWidth > img.naturalHeight
                ? 'landscape'
                : 'portrait';
            item.width = item.orientation === 'landscape' ? 540 : 360;
            item.height = item.width * img.naturalHeight / img.naturalWidth;
            artworks.value = [...artworks.value];
        };
    });
});

watch(currentIndex, newVal => {
    console.log(artworks.value[newVal])
})

function readJSON() {
    return axios('/myexhibition/json/gallery.json')
}

function handleRenderArtwork(index) {
    currentIndex.value = index;
    showMenu.value = false;
}

function handleShowMenu() {
    showMenu.value = true;
}
</script>

<template>
    <n-layout class="landing-container" has-sider>
        <n-layout-sider class="left-siderbar" @click="currentIndex = null"
            :style="{ opacity: currentIndex == null ? '1' : opacity, cursor: 'pointer' }" :width="'5rem'">
            <div class="rotated-text">
                {{ description.toUpperCase() }}
            </div>
        </n-layout-sider>
        <div class="menuButton">
            <n-button text @click="handleShowMenu()">
                <template #icon>
                    <n-icon :size="24">
                        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink"
                            viewBox="0 0 512 512">
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                stroke-width="32" d="M80 160h352"></path>
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                stroke-width="32" d="M80 256h352"></path>
                            <path fill="none" stroke="currentColor" stroke-linecap="round" stroke-miterlimit="10"
                                stroke-width="32" d="M80 352h352"></path>
                        </svg>
                    </n-icon>
                </template>
            </n-button>
        </div>
        <n-layout-content style="height: 100%">
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
                        <n-flex class="artworkInfo" vertical :size="12">
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
                        <n-flex :justify="'center'" class="image-container">
                            <div v-if="artworks[currentIndex].paintingURL.length == 1">
                                <n-image ref="currentImage" style="box-shadow: var(--boxShadow-light);"
                                    :width="artworks[currentIndex].width"
                                    :src="artworks[currentIndex].paintingURL[0]"></n-image>
                            </div>
                            <div v-else-if="artworks[currentIndex].paintingURL.length > 1" style="background: #000;"
                                :style="{ width: `calc(${artworks[currentIndex].width}px + 3.2rem)`, height: `${artworks[currentIndex].height}px` }">
                                <n-carousel show-arrow draggable dot-type="line" dot-placement="right">
                                    <n-image v-for="url in artworks[currentIndex].paintingURL" ref="currentImage"
                                        :width="artworks[currentIndex].width" :src="url"></n-image>
                                </n-carousel>
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
                        <img :src="artwork.paintingURL[0]" />
                    </n-flex>
                </div>
            </n-flex>
        </div>
        <n-drawer v-model:show="showMenu" :width="'calc(8rem + 6rem)'">
            <n-flex class="menu-container" :justify="'center'">
                <n-flex vertical :size="18">
                    <div class="artwork-container" v-for="(artwork, index) in artworks"
                        @click="handleRenderArtwork(index)">
                        <n-flex :align="'end'">
                            <div>[{{ index + 1 }}]</div>
                            <img :src="artwork.paintingURL[0]" />
                        </n-flex>
                    </div>
                </n-flex>
            </n-flex>
        </n-drawer>
    </n-layout>
</template>

<style lang='less' scoped>
@media (max-width: 1020px) {
    .left-siderbar {
        display: none;
    }

    .right-siderbar {
        display: none;
    }
}

@media (min-width: 1020px) {
    .menuButton {
        display: none;
    }
}

.landing-container {
    position: relative;
    font-family: 'IBM Plex Mono', monospace;
    height: 100vh;
    width: 100vw;
}

.menuButton {
    position: absolute;
    right: 2rem;
    top: 2rem;
    z-index: 10;
}

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
    height: 100%;
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
    font-size: 0.8rem;

    .image-content {
        .artworkInfo {
            text-align: center;
        }

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

.image-container {
    :deep(img) {
        max-width: 100%;
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

.menu-container {
    padding: 2rem 0;
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