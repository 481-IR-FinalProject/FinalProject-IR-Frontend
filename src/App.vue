<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <q-header elevated>
        <q-toolbar v-if="currentUser">
          <q-toolbar-title
            ><router-link
              :to="{ name: 'Home' }"
              style="
                text-decoration: none;
                color: white;
                font-size: large;
                margin-right: 2%;
              "
              name="home"
              >Food recipe searching</router-link
            ></q-toolbar-title
          >
          <router-link
            :to="{ name: 'UserDetail' }"
            style="
              text-decoration: none;
              color: white;
              font-size: large;
              margin-right: 2%;
            "
            name="userFav"
            >User favorite food
          </router-link>
          <Button
            label="Logout"
            color="black"
            bgColor="white"
            fontSize="16"
            FontWeight="bold"
            type="submit"
            @click="logout"
            rounded
            name="logout"
          />
        </q-toolbar>
      </q-header>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import AuthService from "boot/AuthService.js";
import Button from "components/Button.vue";
export default {
  components: {
    Button,
  },
  computed: {
    currentUser() {
      return AuthService.getUser();
    },
  },
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped>
</style>
