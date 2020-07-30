<template>
    <div>
        <Contracts :userType="'owner'"/>
    </div>
</template>

<script>
import Contracts from "@/components/commons/Contracts";
    export default {
        name:"OwnerContract",
        components:{Contracts},
    }
</script>

<style scoped>

</style>