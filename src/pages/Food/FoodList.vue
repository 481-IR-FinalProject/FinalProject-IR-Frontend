<template>
  <div>
    <q-page-container class="flex flex-center q-pa-md row q-gutter-lg">
      <FoodCard v-for="foods in food" :key="foods.id" :foods="foods" />
    </q-page-container>
  </div>
</template>
<script>
import FoodCard from "components/FoodCard.vue";
import FoodService from "boot/FoodService.js";
export default {
  components: {
    FoodCard,
  },
  data() {
    return {
      page: 1,
      food: null,
    };
  },
  created() {
    FoodService.getAllFoodWithPagination(this.page).then((response) => {
      this.food = response.data;
      console.log(this.food);
    });
  },
};
</script>