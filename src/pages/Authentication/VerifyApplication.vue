<template>
  <q-page class="flex flex-center background">
    <q-card
      class="my-card shadow-3"
      style="
        padding: 1.5% 5% 1.5% 5%;
        border-radius: 25px;
        margin: 0% 30% 0% 30%;
      "
    >
      <q-card-section class="text-h4 text-center" style="font-weight: bold">
        Verify the application
      </q-card-section>
      <q-card-section
        ><div class="row">
          <div class="col-4 marginCenter">
            <q-avatar
              size="100px"
              font-size="52px"
              color="teal"
              text-color="white"
              icon="person"
            />
          </div>
          <div class="col-4 marginCenter">
            <q-icon name="trending_flat" size="70px" />
          </div>
          <div class="col-4 marginCenter">
            <q-avatar
              size="100px"
              font-size="52px"
              color="teal"
              text-color="white"
              icon="apps"
            />
          </div>
        </div>
      </q-card-section>
      <q-card-section class="text-center text-subtitle2">
        Do you want to access “DemoDemo” with “demo@email.com” account? if yes
        please press the verify button if no you can press reject to cancel this
        operation.
      </q-card-section>
      <q-card-section class="text-center">
        <div>
          <router-link to="/">
            <Button
              type="submit"
              label="VERIFY"
              bgColor="#176492"
              color="white"
              borderRadius="50px"
              width="80%"
              padding="0"
              fontSize="18px"
            />
          </router-link>
        </div>
        <div style="margin-top: 2%">
          <router-link
            to="/login"
            style="color: #b6b6b6; font-size: 16px"
            @click="logout"
            >Reject</router-link
          >
        </div>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import AuthService from "@/service/AuthService.js";
import Button from "@/components/Button.vue";
export default {
  components: {
    Button,
  },
  name: "VerifyApplication",
  methods: {
    logout() {
      AuthService.logout();
      this.$router.push({ name: "Login" });
    },
  },
};
</script>
<style scoped>
.b {
  border: 1px solid black;
}
.marginCenter {
  margin: auto 0 auto 0;
  text-align: center;
}
a {
  text-decoration: none;
}
.background {
  background-image: url(/pictures/bg4.png);
  background-size: cover;
}
</style>
