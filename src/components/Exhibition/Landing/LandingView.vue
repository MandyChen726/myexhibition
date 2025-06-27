<script setup>
import { ref } from 'vue'

</script>

<template>
    <n-layout style="position: relative;" has-sider>
        <n-layout-sider :width="'5rem'">
            <div class="rotated-text">
                Mandy is a remarkably gifted teenage painter whose work already demonstrates a maturity and confidence
                well beyond her years. From early on, she showed an intuitive understanding of color, composition, and
                balance—qualities that have only deepened as she’s explored the expressive possibilities of acrylic
                paint.
            </div>
        </n-layout-sider>
        <n-layout-content>

        </n-layout-content>
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
        width: 100vh;
    }
}
</style>