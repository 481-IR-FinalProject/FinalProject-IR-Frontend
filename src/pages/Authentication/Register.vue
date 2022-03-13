<template>
  <q-page
    class="flex-center text-center fullscreen"
    style="background-color: rgb(81, 205, 221)"
  >
    <div class="balance">
      <div class="text-h4 title-color">Registration to use our services</div>
      <br />
      <q-card class="register-card shadow-3" style="border-radius: 25px">
        <Form @submit="handleRegister" :validation-schema="schema">
          <q-card-section>
            <div style="margin-top: 2.5%"></div>
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
            <div style="margin-top: 2.5%"></div>
            <Field
              name="confirmPassword"
              v-slot="{ errorMessage, value, field }"
              v-model="confirmPassword"
            >
              <BaseInput
                :errorMessage="errorMessage"
                :modelValue="value"
                :vBind="field"
                label="Confirm Password"
                name="confirmPassword"
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
              label="REGISTER"
              bgColor="#176492"
              color="white"
              borderRadius="50px"
              width="100%"
              padding="0"
              fontSize="18px"
              :disabled="!username || !password || !confirmPassword"
              name="submitButton"
            />
          </q-card-section>
          <div class="text-subtitle2 register">
            Already have an account?
            <router-link
              :to="{ name: 'Login' }"
              class="link text-subtitle2"
              name="goToLogin"
              >Login</router-link
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
  name: "Register",
  components: {
    BaseInput,
    Button,
    Field,
    Form,
  },
  data() {
    const schema = yup.object().shape({
      username: yup.string().required().email().label("Email"),
      password: yup.string().required().min(6).label("Password"),
      confirmPassword: yup
        .string()
        .required()
        .min(6)
        .oneOf([yup.ref("password"), null], "Passwords must match")
        .label("Confirm password"),
    });
    return {
      message: "",
      schema,
    };
  },
  setup() {
    return {
      email: ref(""),
      password: ref(""),
      confirmPassword: ref(""),
    };
  },
  methods: {
    handleRegister(user) {
      AuthService.register(user)
        .then(() => {
          this.$router.push({ name: "Login" });
        })
        .catch(() => {
          this.message = "Cannot register to the system";
        });
    },
  },
};
</script>

<style>
.register-card {
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
