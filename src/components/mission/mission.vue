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
                <n-gi :span="12">
                    <div class="slogan"><b>I REALLY<br /> WANT TO<br /> GET UP EARLY</b></div>
                </n-gi>
                <n-gi :span="10" :offset="2">
                    <h2>Why I Created This App?</h2>
                    <p>Useless alarms, chaotic mornings—that’s my story. No matter how early I go to bed, I struggle to
                        wake up on time, leaving my mornings in a rush. The consequences? Forgetting essentials like my
                        laptop, notebook, or pencil case when heading out. I wanted a change—a way to wake up earlier
                        and start my day without the stress and disarray. That’s why I created this app: to transform
                        mornings from a frantic scramble into a smooth, productive start.</p>
                    <h2>Why We Need This App?</h2>
                    <p>I knew I wasn’t the only one facing this problem. Many people struggle with waking up early, even
                        with multiple alarms blaring every few minutes. It’s not just adults—parents often feel helpless
                        watching their kids stay up late and struggle to get out of bed, turning every morning into a
                        battle.</p>
                    <p>I am offering a solution for people like me, and for families dealing with these challenges. It’s
                        not just about waking up; it’s about building a habit that transforms mornings from chaos into
                        calm. For parents, it’s a way to help their kids develop a healthier routine without nagging.
                        And for individuals, it’s a step toward reclaiming mornings and starting the day on the right
                        foot.</p>
                    <n-button style="margin-top: 12px" type="primary" @click="scrollToBottom(block2)">
                        Scroll Down
                    </n-button>
                </n-gi>
            </n-grid>
        </n-flex>
        <div ref="block2">
            <n-flex class="block2" :align="'center'">
                <n-grid class="block2__inner">
                    <n-gi :span="10">
                        <h1>Lorem ipsum odor amet?</h1>
                        <p>Congue senectus viverra; augue vulputate placerat lacinia. Ante mollis aliquet proin
                            gravida etiam. Aptent cras tortor rutrum nisi orci. Himenaeos mattis felis habitant
                            interdum finibus a orci diam. Ligula proin efficitur et donec efficitur eros vehicula.
                            Lobortis nibh magnis curae aenean velit maximus fringilla placerat? Suspendisse sociosqu
                            vestibulum consequat at nostra fringilla montes libero. Nunc gravida ac interdum tempus
                            nunc imperdiet massa class.</p>
                        <h1>Posuere leo natoque dolor etiam?</h1>
                        <p>Magna varius posuere proin porta suspendisse. Himenaeos fermentum pellentesque elementum
                            a lacinia. Vivamus morbi vivamus vitae tempus dictumst platea. Placerat laoreet taciti
                            blandit congue; dolor sociosqu neque. Ac posuere suspendisse ornare elit suspendisse.
                            Nullam ut rhoncus eros bibendum tempus quis diam ullamcorper torquent. Potenti
                            adipiscing non vehicula orci pretium feugiat curabitur nullam. Cras consectetur ad
                            consectetur, sed fermentum malesuada fames nisi.</p>
                    </n-gi>
                    <n-gi :span="14">
                        <n-flex :justify="'right'">
                            <n-flex vertical>
                                <n-image :width="560" src="./myexhibition/SunRiseGarden/mission/mission_1.gif"
                                    preview-disabled></n-image>
                                <n-flex :justify="'center'">
                                    <n-text :depth="3">Neque dui quam pretium matti elementum.</n-text>
                                </n-flex>
                            </n-flex>
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

            .slogan {
                font-size: 96px;
                line-height: 86px;
                letter-spacing: -0.075em;
                word-spacing: 0.1em;
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