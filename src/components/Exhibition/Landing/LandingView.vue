<script setup>
import { ref } from 'vue'

</script>

<template>
    <n-layout>
        <n-layout-sider style="height: 100vh">
            <div class="rotated-text">
                竖排文字示例
            </div>
        </n-layout-sider>
        <n-layout-content>

        </n-layout-content>
    </n-layout>
</template>

<style lang='less' scoped>
.rotated-text {
    transform: rotate(90deg);
    transform-origin: top left;
    position: relative;
    top: 1rem;
    left: 1rem;
}
</style>