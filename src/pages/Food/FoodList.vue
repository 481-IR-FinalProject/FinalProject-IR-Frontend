<template>
  <div>
    <q-page-container class="flex flex-center q-pa-md row q-gutter-lg">
      <FoodCard v-for="foods in food" :key="foods.id" :foods="foods" />
    </q-page-container>
    <div class="q-pa-lg flex flex-center">
      <q-space />
      <q-space />
      <q-space />
      <q-space />
      <q-space />
      <div v-if="this.page != 1">
        <router-link :to="{ name: 'Home', query: { page: 1 } }">
          <q-icon
            v-for="size in ['md']"
            :key="size"
            :size="size"
            name="first_page"
          />
        </router-link>
        <router-link :to="{ name: 'Home', query: { page: page - 1 } }">
          <q-icon
            v-for="size in ['md']"
            :key="size"
            :size="size"
            name="navigate_before"
          />
        </router-link>
      </div>

      <q-space />

      <div v-if="HasNext">
        <router-link :to="{ name: 'Home', query: { page: page + 1 } }">
          <q-icon
            v-for="size in ['md']"
            :key="size"
            :size="size"
            name="navigate_next"
          />
        </router-link>
        <router-link
          :to="{ name: 'Home', query: { page: LastPage } }"
          v-if="page != 0"
        >
          <q-icon
            v-for="size in ['md']"
            :key="size"
            :size="size"
            name="last_page"
          />
        </router-link>
      </div>

      <q-space />
      <q-space />
      <q-space />
      <q-space />
      <q-space />
    </div>
  </div>
</template>
<script>
import FoodCard from "components/FoodCard.vue";
import FoodService from "boot/FoodService.js";
import AuthService from "src/boot/AuthService";
export default {
  components: {
    FoodCard,
  },
  data() {
    return {
      food: null,
      maxPage: 0,
    };
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
  },
  computed: {
    HasNext() {
      let totalpage = this.maxPage;
      return this.page < totalpage;
    },
    LastPage() {
      let totalpage = this.maxPage;
      return totalpage;
    },
  },
  created() {
    FoodService.getAllFoodWithPagination(this.page).then((response) => {
      (this.food = response.data),
        FoodService.getFoodCount().then((response) => {
          this.maxPage = (response.data / 10 + 1).toFixed(0);
        });
    });
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    FoodService.getAllFoodWithPagination(
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      next((compute) => {
        compute.food = response.data;
      });
    });
  },
  beforeRouteUpdate(routeTo) {
    FoodService.getAllFoodWithPagination(
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      this.food = response.data;
    });
  },
};
</script>