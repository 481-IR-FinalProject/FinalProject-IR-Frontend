<template>
  <div class="text-h4 flex flex-center" style="margin-top: 5%">
    {{ user.username }}
  </div>
  <q-page-container class="flex flex-center q-pa-md row q-gutter-lg">
    <FoodCard v-for="foods in food" :key="foods" :foods="foods" />
  </q-page-container>
</template>
<script>
import AuthService from "boot/AuthService.js";
import FoodService from "boot/FoodService";
import FoodCard from "components/FoodCard.vue";
export default {
  components: {
    FoodCard,
  },
  data() {
    return {
      user: null,
      food: null,
    };
  },
  created() {
    this.user = AuthService.getUser();
    console.log(this.user.id);
    FoodService.getFavoriteFood(this.user.id).then((response) => {
      this.food = response.data;
      console.log(this.food);
    });
  },
};
</script>