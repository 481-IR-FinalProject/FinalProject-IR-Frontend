<template>
  <q-input
    v-if="
      type != 'password' &&
      type != 'email' &&
      label != 'Firstname' &&
      label != 'Lastname'
    "
    rounded
    outlined
    :model-value="modelValue"
    v-bind="vBind"
    :type="type"
    :label="label"
    :error-message="errorMessage"
    :error="!!errorMessage"
    :style="{
      fontSize: fontSize,
    }"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
  <q-input
    v-else-if="type == 'email'"
    rounded
    outlined
    :model-value="modelValue"
    v-bind="vBind"
    :type="type"
    :label="label"
    :error-message="errorMessage"
    :error="!!errorMessage"
    @keydown.space.prevent
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
  <q-input
    v-else-if="label == 'Firstname' || label == 'Lastname'"
    rounded
    outlined
    :model-value="modelValue"
    v-bind="vBind"
    :type="type"
    :label="label"
    :error-message="errorMessage"
    :error="!!errorMessage"
    @keydown.space.prevent
    v-on:keypress="isLetterOnly($event)"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
  <q-input
    v-else
    rounded
    outlined
    :model-value="modelValue"
    v-bind="vBind"
    :type="isPwd ? 'password' : 'text'"
    :label="label"
    :error-message="errorMessage"
    :error="!!errorMessage"
    @keydown.space.prevent
    v-model="email"
  >
    <template v-slot:prepend>
      <q-icon :name="icon" />
    </template>
    <template v-slot:append v-if="type == 'password'">
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
  </q-input>
</template>

<script>
import { ref } from "vue";

export default {
  name: "BaseInput",
  props: {
    modelValue: {
      type: String,
      default: "",
    },
    vBind: {
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: "",
    },
    errorMessage: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "",
    },
  },
  setup() {
    return {
      text: ref(""),
      isPwd: ref(true),
    };
  },
  methods: {
    isLetterOrNumber(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z0-9_-]+$/.test(char)) return true;
      else e.preventDefault();
    },
    isLetterOnly(e) {
      let char = String.fromCharCode(e.keyCode);
      if (/^[A-Za-z-]+$/.test(char)) return true;
      else e.preventDefault();
    },
  },
};
</script>
