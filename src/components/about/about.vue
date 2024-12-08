<script setup>
import { ref } from 'vue';

const block2 = ref(null);

const scrollToBottom = async (frame) => {
    window.scrollTo({ top: frame.clientHeight, behavior: "smooth" });
};
</script>

<template>
    <div class="content">
        <n-flex class="block1" :align="'center'">
            <n-grid class="block1__inner">
                <n-gi :span="8">
                    <n-avatar class="avatar" :size="384" src="./myexhibition/LuckyCat/about/avatar.jpg" />
                </n-gi>
                <n-gi :span="14" :offset="2">
                    <div style="font-size: 128px"><b>Hi there!</b></div>
                    <n-p>
                        <n-text :depth="3" style="font-size: 18px">My name is Mandy. I was born in 2011 and currently
                            attend the British School of Beijing as an eighth grader.</n-text>
                    </n-p>
                    <n-p>
                        <n-text :depth="3" style="font-size: 18px">I love painting, especially with acrylics. My
                            favorite subjects to paint are cats because creating art helps me feel calm and relaxed.
                            Besides painting, I enjoy playing soccer and spending time on my Nintendo Switch, where my
                            favorite games are The Legend of Zelda and Animal Crossing. Occasionally, I also dabble in
                            Minecraft.</n-text>
                    </n-p>
                    <n-p>
                        <n-text :depth="3" style="font-size: 18px">I’m fluent in English and Chinese, though my Spanish
                            still needs some improvement.</n-text>
                    </n-p>
                    <n-p>
                        <n-text :depth="3" style="font-size: 18px">I’ve started learning how to identify user needs,
                            sketch design drafts, and turn my ideas into real products. This experience has given me
                            insight into the creative and practical side of product design. In the future, I aspire to
                            become a successful entrepreneur, building great products and earning a lot of
                            money.</n-text>
                    </n-p>
                    <n-p>
                        <n-text :depth="3" style="font-size: 18px">Through my app, I hope to help users enjoy their
                            mornings without feeling rushed or overwhelmed.</n-text>
                    </n-p>
                    <div style="margin-top: 24px;">
                        <n-button type="primary" @click="scrollToBottom(block2)">
                            For more information
                        </n-button>
                    </div>
                </n-gi>
            </n-grid>
        </n-flex>
        <div ref="block2">
            <n-flex class="block2" :align="'center'">
                <n-grid class="block2__inner">
                    <n-gi :span="14">
                        <h1>Turning ideas into reality</h1>
                        <p>Creativity has always been a defining part of who I am. I constantly come up with fresh and
                            exciting ideas, and I love spending my free time bringing these concepts to life.</p>
                        <p>Whether it’s experimenting with new art styles, designing unique projects, or brainstorming
                            innovative ways to solve problems, I find joy in the process of transforming my imagination
                            into something tangible. This ability to turn ideas into reality fuels my passion for
                            exploration and growth.</p>
                        <h1>Why I learn programming</h1>
                        <p>As someone who loves art, I’ve always dreamed of sharing my work with a broader audience.
                            Recently, I became fascinated by the idea of hosting an online art exhibition, where people
                            from all over the world can experience my artwork. To achieve this, I realized I need to
                            learn programming, which would allow me to create a platform that combines my creativity
                            with technology. By learning coding, I hope to build a digital space where art and
                            innovation come together, inspiring others as much as it inspires me.</p>
                    </n-gi>
                    <n-gi :span="8" :offset="2">
                        <n-flex>
                            <n-tag size="large">Sketch</n-tag>
                            <n-tag size="large">Oil Painting</n-tag>
                            <n-tag size="large">Acrylic Painting</n-tag>
                            <n-tag size="large">HTML/CSS</n-tag>
                            <n-tag size="large">JavaScript</n-tag>
                            <n-tag size="large">Leadership</n-tag>
                            <n-tag size="large">Homework Killer</n-tag>
                            <n-tag size="large">UI Design</n-tag>
                            <n-tag size="large">Soccer</n-tag>
                        </n-flex>
                    </n-gi>
                </n-grid>
            </n-flex>
        </div>
    </div>
</template>

<style lang="less" scoped>
.content {
    width: 1200px;
    margin: 0 auto;
    padding: 24px;

    .block1 {
        min-height: calc(100vh - 87px - 48px);

        .block1__inner {
            margin-top: -87px;
            align-items: center;

            .avatar {
                border-radius: 12px;
                box-shadow: var(--boxShadow-deep);
            }
        }
    }

    .block2 {
        min-height: 100vh;

        .block2__inner {
            align-items: center;
        }
    }
}
</style>