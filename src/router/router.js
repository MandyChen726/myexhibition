import { createWebHistory, createRouter } from "vue-router";
import store from "../store/store";
import Layout from "../components/Layout/layout.vue"
import mLayout from "../components/Layout/mLayout.vue"
import home from "../components/home/home.vue"
import mission from "../components/mission/mission.vue"
import development from "../components/development/development.vue"
import about from "../components/about/about.vue"

const routes = [
    {
        path: "/myexhibition/",
        name: "early-riser",
        component: store.state.display.isMobile ? mLayout : Layout,
        children: [
            {
                path: "",
                name: "early-riser-home",
                component: home
            },
            {
                path: "mission",
                name: "early-riser-mission",
                component: mission
            },
            {
                path: "development-history",
                name: "early-riser-development",
                component: development
            },
            {
                path: "about",
                name: "early-riser-about",
                component: about
            }
        ]
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;