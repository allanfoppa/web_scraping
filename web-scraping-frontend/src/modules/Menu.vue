<template>
    <div id="nav">
        <router-link to="/">Home</router-link> |
        <router-link to="/about">About</router-link> |
    </div>
</template>

<script>
export default {
    data(){
        menus [
            {}
        ]
    }
}
</script>

<style scoped>

#nav a.router-link-exact-active {
	color: #42b983;
}

</style>