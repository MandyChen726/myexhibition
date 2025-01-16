<script setup>
import { ref, watch } from 'vue'
import router from '../../../router/router'
import store from '../../../store/store';
import axios from 'axios';

const artworks = ref([]);

const curArtwork = ref(null);

initial();

watch(curArtwork, (newVal) => {
    if (!newVal) return
    const currentIndex = artworks.value.findIndex(a => a.id === newVal.id)
    if (currentIndex === -1) return

    const length = artworks.value.length
    const nextIndex = (currentIndex + 1) % length
    const prevIndex = (currentIndex - 1 + length) % length

    const nextArtwork = artworks.value[nextIndex]
    const prevArtwork = artworks.value[prevIndex]

    preloadImage(nextArtwork?.paintingURL)
    preloadImage(prevArtwork?.paintingURL)
})

async function initial() {
    const buffer = await readJSON();
    artworks.value = buffer.data;
    if (!router.currentRoute.value.params.artworkKey) {
        router.push({ name: "Exhibition-artwork", params: { artworkKey: buffer.data[0].key } })
        curArtwork.value = buffer.data[0]
    } else {
        curArtwork.value = artworks.value.find(a => a.key === router.currentRoute.value.params.artworkKey)
    }
}

function readJSON() {
    return axios('/myexhibition/json/gallery.json')
}

function getAction(data) {
    if (data) {
        if (curArtwork.value.id === artworks.value.length) {
            curArtwork.value = artworks.value[0]
        } else {
            curArtwork.value = artworks.value.find(a => a.id === curArtwork.value.id + 1)
        }
    } else {
        if (curArtwork.value.id === 1) {
            curArtwork.value = artworks.value[artworks.value.length - 1]
        } else {
            curArtwork.value = artworks.value.find(a => a.id === curArtwork.value.id - 1)
        }
    }
    router.replace({ name: "Exhibition-artwork", params: { artworkKey: curArtwork.value.key } })
}

function preloadImage(url) {
    if (!url) return;
    const img = new Image();
    img.src = url;
}
</script>

<template>
    <n-layout class="container">
        <n-layout-header class="header">
            <n-grid>
                <n-gi :span="8">
                    <n-flex></n-flex>
                </n-gi>
                <n-gi :span="8">
                    <n-flex :justify="'center'">
                        <b style="font-size: 18px">Mandy's Digital-Gallery©</b>
                    </n-flex>
                </n-gi>
                <n-gi :span="8">
                    <n-flex :justify="'end'">
                    </n-flex>
                </n-gi>
            </n-grid>
        </n-layout-header>
        <n-config-provider :theme="store.state.display.theme">
            <n-layout-content>
                <router-view :artworks="artworks" :curArtwork="curArtwork" @getAction="getAction" />
            </n-layout-content>
        </n-config-provider>
        <n-layout-footer>
            <n-flex :justify="'center'">
                <div>2024 Copyright © <span class="primaryColor">Mandy Chen</span>. All rights reserved.</div>
            </n-flex>
        </n-layout-footer>
    </n-layout>
</template>

<style lang='less' scoped>
@import 'vfonts/IBMPlexSans.css';

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