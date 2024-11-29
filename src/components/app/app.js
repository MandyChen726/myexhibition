import router from "../../router/router";

export function handleQuit() {
    localStorage.removeItem("familyID");
    localStorage.removeItem("identity");
    router.push({ name: "SunRiseGarden-app-landing" });
}

export const type = [
    {
        label: "零食",
        type: 1,
    },
    {
        label: "大餐",
        type: 2,
    },
    {
        label: "出游",
        type: 3,
    },
    {
        label: "盲盒",
        type: 4,
    },
    {
        label: "礼物",
        type: 5,
    },
    {
        label: "奖励",
        type: 6,
    },
    {
        label: "游戏",
        type: 7,
    }
]

export const items = [
    {
        label: "Gummy Bear",
        type: 1,
        price: 2,
        stock: 99
    },
    {
        label: "Macbook Pro 14-inch",
        type: 6,
        price: 180,
        stock: 1
    },
    {
        label: "Playing Switch for One Hour",
        type: 7,
        price: 5,
        stock: 99
    }
]