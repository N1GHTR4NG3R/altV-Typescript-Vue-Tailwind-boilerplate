<template>
    <div class="home">
        <img id="altVLogo" alt="alt:V Logo" src="../assets/img/logos/altV.png" />
    </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
// import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src

export default defineComponent({
    name: 'Home',
    components: {
        // Add components here
    }
});
</script>
<style>
#home {
    width: 100vw;
    height: 100vh;
}
#altVLogo {
    position: relative;
    top: 83vh;
    left: 91.5vw;
    height: 200px;
    width: 200px;
}
</style>
