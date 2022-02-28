<template>
  <div>
    <h1>User Page</h1>
    <Button label="Logout" type="submit" @click="logout" />
  </div>
</template>

<script>
import Button from "components/Button.vue";
import AuthService from "boot/AuthService.js";

export default {
  name: "Home",
  components: {
    Button,
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
