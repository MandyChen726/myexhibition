<script lang='ts' setup>
import router from '../../router/router';

if (router.currentRoute.value.name == 'Mandy') {
    router.push({ name: "Exhibition" })
}
</script>

<template>
    <router-view />
</template>