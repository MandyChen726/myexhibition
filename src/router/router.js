import { createWebHashHistory, createRouter } from "vue-router";
import store from "../store/store";
import Layout from "../components/Layout/layout.vue"
import mLayout from "../components/Layout/mLayout.vue"
import home from "../components/home/home.vue"
import mission from "../components/mission/mission.vue"
import development from "../components/development/development.vue"
import about from "../components/about/about.vue"
import app from "../components/app/app.vue";
import landing from "../components/app/landing.vue"
import sunrise from "../components/app/sunrise.vue";
import garden from "../components/app/garden.vue";

const routes = [
    {
        path: "/",
        name: "SunRiseGarden",
        component: store.state.display.isMobile ? mLayout : Layout,
        children: [
            {
                path: "",
                name: "SunRiseGarden-home",
                component: home
            },
            {
                path: "mission",
                name: "SunRiseGarden-mission",
                component: mission
            },
            {
                path: "development-history",
                name: "SunRiseGarden-development",
                component: development
            },
            {
                path: "about",
                name: "SunRiseGarden-about",
                component: about
            },
            {
                path: "app/landing",
                name: "SunRiseGarden-app-landing",
                component: landing,
            },
            {
                path: "app",
                name: "SunRiseGarden-app",
                component: app,
                children: [
                    {
                        path: "",
                        name: "SunRiseGarden-app-sunrise",
                        component: sunrise
                    },
                    {
                        path: "garden",
                        name: "SunRiseGarden-app-garden",
                        component: garden
                    },
                ]
            }
        ]
    }
];

const router = createRouter({
    history: createWebHashHistory("/myexhibition/"),
    routes,
});

router.afterEach(() => {
    window.scrollTo(0, 0)
})

export default router;