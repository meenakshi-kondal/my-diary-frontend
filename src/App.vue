<template>
  <router-view />
</template>

<script>
import Dashboard from "./views/Dashboard.vue";

export default {
  components: {
    Dashboard,
  },
};
</script>


<style>
body {
  margin: 0;
  font-family: Arial, sans-serif;
  background: var(--bg);
}
</style>