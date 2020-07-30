<template>
    <div>
        <Contracts :userType="'host'"/>
    </div>
</template>

<script>
import Contracts from "@/components/commons/Contracts";
    export default {
        name:"HostContract",
        components:{Contracts},
    }
</script>

<style scoped>

</style>