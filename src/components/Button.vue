<template>
  <q-btn
    :style="{
      backgroundColor: bgColor,
      color: color,
      borderRadius: borderRadius,
      width: width,
      padding: padding,
      fontSize: fontSize,
      border: borderStyle,
      fontWeight: FontWeight,
    }"
    :label="label"
    :type="type"
  />
</template>

<script>
export default {
  name: "Button",
  props: {
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "",
    },
    bgColor: {
      type: String,
      default: "",
    },
    color: {
      type: String,
      default: "",
    },
    borderRadius: {
      type: String,
      default: "",
    },
    width: {
      type: String,
      default: "",
    },
    padding: {
      type: String,
      default: "",
    },
    fontSize: {
      type: String,
      default: "",
    },
    borderStyle: {
      type: String,
      default: "",
    },
    FontWeight: {
      type: String,
      default: "",
    },
  },
};
</script>
