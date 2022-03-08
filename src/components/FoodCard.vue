<template>
  <q-card class="my-card shadow-10" transition="scale">
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
            <b> {{ foods.id }}. {{ foods.title }}</b>
          </div>
        </router-link>
      </q-card-section>
    </q-card-section>
    <q-card-section>
      <q-card-actions horizontal class="justify-around q-px-md">
        <q-btn
          flat
          v-if="!checkFav"
          round
          color="black"
          icon="favorite"
          @click="addFav"
        />
        <q-btn
          flat
          v-if="checkFav"
          round
          color="red"
          icon="favorite"
          @click="removeFav"
        />
      </q-card-actions>
    </q-card-section>
  </q-card>
</template>
<script>
import FoodService from "boot/FoodService.js";

export default {
  name: "FoodCard",
  props: {
    foods: {
      type: Object,
      required: true,
    },
    checkFav: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    removeFav() {
      FoodService.removeFavoriteFood(this.foods.id);
      console.log("Remove favorite successfully!!!");
      this.$router.go();
    },
    addFav() {
      FoodService.addFavoriteFood(this.foods.id);
      console.log("Add favorite successfully!!!");
      this.$router.go();
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