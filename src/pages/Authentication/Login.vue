<template>
  <q-page
    class="flex-center text-center fullscreen"
    style="background-color: rgb(81, 205, 221)"
  >
    <div class="balance">
      <div class="text-h4 title-color">Log in to continue to "app"</div>
      <br />
      <q-card class="login-card shadow-3" style="border-radius: 25px">
        <Form @submit="handleLogin" :validation-schema="schema">
          <q-card-section>
            <Field
              name="username"
              v-slot="{ errorMessage, value, field }"
              v-model="username"
            >
              <BaseInput
                :error-message="errorMessage"
                :modelValue="value"
                :vBind="field"
                label="Email"
                name="username"
                type="email"
                icon="email"
              />
            </Field>
            <div style="margin-top: 2.5%"></div>
            <Field
              name="password"
              v-slot="{ errorMessage, value, field }"
              v-model="password"
            >
              <BaseInput
                :errorMessage="errorMessage"
                :modelValue="value"
                :vBind="field"
                label="Password"
                name="password"
                type="password"
                icon="lock"
              />
            </Field>

            <div style="margin-top: 1.5%"></div>
            <div v-if="message" class="text-red">
              {{ message }}
            </div>
            <div style="margin-top: 4%"></div>
            <Button
              type="submit"
              label="LOGIN"
              bgColor="#176492"
              color="white"
              borderRadius="50px"
              width="100%"
              padding="0"
              fontSize="18px"
              :disabled="!username || !password"
            />
          </q-card-section>

          <div class="text-subtitle2 register">
            Don't have an account?
            <router-link :to="{ name: 'Register' }" class="link text-subtitle2"
              >Register</router-link
            >
          </div>
        </Form>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import BaseInput from "components/BaseInput.vue";
import Button from "components/Button.vue";
import AuthService from "boot/AuthService.js";
import * as yup from "yup";
import { ref } from "vue";
import { Field, Form } from "vee-validate";

export default {
  name: "Login",
  components: {
    BaseInput,
    Button,
    Field,
    Form,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required().email().label("Email"),
      password: yup.string().required().label("Password"),
    });
    return {
      message: "",
      schema,
    };
  },
  setup() {
    return {
      username: ref(""),
      password: ref(""),
    };
  },
  computed: {
    isAdmin() {
      return AuthService.hasRoles("ROLE_ADMIN");
    },
    isUser() {
      return AuthService.hasRoles("ROLE_VISITOR");
    },
  },
  methods: {
    handleLogin(user) {
      AuthService.login(user)
        .then(() => {
          if (this.isAdmin) {
            this.$router.push({ name: "AdminProjectList" });
          } else if (this.isUser) {
            this.$router.push({
              name: "VerifyApplication",
            });
          }
        })
        .catch(() => {
          this.message = "Cannot login to the system.";
        });
    },
  },
};
</script>

<style>
.login-card {
  padding: 25px;
}
.forget-password {
  color: #0695cd;
  font-size: 24px;
  text-decoration: none;
}
.register {
  color: #b6b6b6;
  text-decoration: none;
}
.title-color {
  color: white;
}
.balance {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.link {
  color: #0695cd;
  font-size: 24px;
  text-decoration: none;
}
</style>
