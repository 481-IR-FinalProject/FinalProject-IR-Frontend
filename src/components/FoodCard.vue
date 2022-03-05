<template>
  <q-card class="my-card shadow-10" :root="listEl" transition="scale">
    <q-card-section horizontal>
      <q-img
        class="col-5"
        style="margin: 2%"
        :src="'FoodImages/' + foods.image + '.jpg'"
        width="150px"
        height="150px"
      />

      <q-card-section
        style="word-wrap: break-word margin: 0.7%"
        class="col-7 q-mt-sm q-mb-xs"
      >
        <router-link
          class="hoverName"
          :to="{ name: 'FoodDetail', params: { id: foods.id } }"
        >
          <div class="text-h5">
            <b> {{ foods.id }}. {{ foods.title }} </b>
          </div>
        </router-link>
      </q-card-section>
    </q-card-section>
    <q-card-section>
      <q-card-actions horizontal class="justify-around q-px-md">
        <!-- <div v-if="checkFav == false"> -->
        <q-btn flat round color="black" icon="favorite" @click="addFav" />
        <!-- </div>
        <div v-if="checkFav == true"> -->
        <q-btn flat round color="red" icon="favorite" @click="removeFav" />
        <!-- </div> -->
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
import FoodService from "boot/FoodService.js";
import AuthService from "boot/AuthService.js";
export default {
  name: "FoodCard",
  props: {
    foods: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      userID: null,
      favorite: [],
    };
  },
  setup() {
    return {
      checkFav: true,
    };
  },
  created() {
    this.userID = AuthService.getUser().id;
  },
  methods: {
    removeFav() {
      FoodService.removeFavoriteFood(this.userID, this.foods.id);
      this.checkFav = false;
    },
    addFav() {
      FoodService.addFavoriteFood(this.userID, this.foods.id);
      this.checkFav = true;
    },
  },
};
</script>
<style scope>
.my-card:hover {
  cursor: pointer;
  opacity: 0.8;
  transform: scale(1.04);
}
.my-card {
  width: 100%;
  max-width: 600px;
  height: 250px;
}

.hoverName :hover {
  color: #1976d3;
}
a {
  text-decoration: none;
  color: black;
}
</style>