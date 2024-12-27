import { createWebHashHistory, createRouter } from "vue-router";
import store from "../store/store";
import Layout from "../components/LuckyCat/Layout/layout.vue"
import mLayout from "../components/LuckyCat/Layout/mLayout.vue"
import home from "../components/LuckyCat/home/home.vue"
import mission from "../components/LuckyCat/mission/mission.vue"
import development from "../components/LuckyCat/development/development.vue"
import about from "../components/LuckyCat/about/about.vue"
import app from "../components/LuckyCat/app/app.vue";
import landing from "../components/LuckyCat/app/landing.vue"
import Luckycat from "../components/LuckyCat/app/luckycat.vue";
import shop from "../components/LuckyCat/app/shop.vue";

const routes = [
    {
        path: "/",
        name: "Mandy",
        component: () => store.state.display.isMobile ? import("../components/Layout/mLayout.vue") : import("../components/Layout/layout.vue"),
        children: [
            {
                path: "",
                name: "Exhibition",
                component: () => store.state.display.isMobile ? import("../components/Exhibition/Layout/mLayout.vue") : import("../components/Exhibition/Layout/layout.vue"),
                children: [
                    {
                        path: "/artwork/:artworkKey",
                        name: "Exhibition-artwork",
                        component: () => store.state.display.isMobile ? import("../components/Exhibition/artwork/mArtwork.vue") : import("../components/Exhibition/artwork/artwork.vue"),
                    }
                ]
            },
            {
                path: "/LuckyCat",
                name: "LuckyCat",
                component: store.state.display.isMobile ? mLayout : Layout,
                children: [
                    {
                        path: "",
                        name: "LuckyCat-home",
                        component: home
                    },
                    {
                        path: "mission",
                        name: "LuckyCat-mission",
                        component: mission
                    },
                    {
                        path: "development-history",
                        name: "LuckyCat-development",
                        component: development
                    },
                    {
                        path: "about",
                        name: "LuckyCat-about",
                        component: about
                    },
                    {
                        path: "app/landing",
                        name: "LuckyCat-app-landing",
                        component: landing,
                    },
                    {
                        path: "app",
                        name: "LuckyCat-app",
                        component: app,
                        children: [
                            {
                                path: "",
                                name: "LuckyCat-app-sunrise",
                                component: Luckycat
                            },
                            {
                                path: "garden",
                                name: "LuckyCat-app-garden",
                                component: shop
                            },
                        ]
                    }
                ]
            }
        ]
    },
];

const router = createRouter({
    history: createWebHashHistory("/myexhibition/"),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.name === 'Mandy') {
        next({ name: 'Exhibition' });
    } else {
        next();
    }
});

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;