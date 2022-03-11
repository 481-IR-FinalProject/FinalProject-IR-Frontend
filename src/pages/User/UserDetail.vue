<template>
  <div class="text-h4 flex flex-center" style="margin-top: 5%">
    {{ user.username }}
  </div>
  <q-page-container class="flex flex-center q-pa-md row q-gutter-lg">
    <FoodCard
      v-for="foods in food"
      :key="foods.id"
      :foods="foods"
      :checkFav="keep.includes(foods.id) ? true : false"
    />
  </q-page-container>
</template>
<script>
import FoodService from "boot/FoodService";
import FoodCard from "components/FoodCard.vue";
import AuthService from "src/boot/AuthService";
export default {
  components: {
    FoodCard,
  },
  data() {
    return {
      user: null,
      food: null,
      keep: [],
    };
  },
  created() {
    this.user = AuthService.getUser();
    FoodService.getFavoriteFood().then((response) => {
      this.food = response.data;
      for (let i = 0; i < this.food.length; i++) {
        this.keep.push(this.food[i].id);
      }
    });
  },
};
</script>