<template>
  <div class="q-pa-md">
    <q-card class="shadow-3">
      <q-card-section horizontal>
        <q-card-section vertical>
          <q-img
            :src="'FoodImages/' + food.image + '.jpg'"
            width="450px"
            height="350px"
          />
        </q-card-section>
        <q-card-section vertical style="width: 100%">
          <div class="text-h4 text-bold text-primary">
            {{ food.title }}
          </div>
          <q-separator />
          <div class="text-h5 text-green-6">Ingredients</div>
          <q-scroll-area
            style="height: 200px"
            :thumb-style="thumbStyle"
            :visible="true"
          >
            <div
              class="text-subtitle1"
              v-for="ingredients in ingredient"
              :key="ingredients"
            >
              • {{ ingredients }}
            </div>
          </q-scroll-area>
          <br />
          <div class="text-h5 text-green-6">Instruction</div>
          <q-scroll-area
            style="height: 200px"
            :thumb-style="thumbStyle"
            :visible="true"
          >
            <div
              class="text-subtitle1"
              v-for="instructions in instruction"
              :key="instructions"
            >
              • {{ instructions }}
            </div>
          </q-scroll-area>
        </q-card-section>
      </q-card-section>
    </q-card>
    <div class="text-h5 text-bold text-primary" style="margin-top: 2%">
      <q-toggle v-model="visible" label=" Recommended food" class="q-mb-md" />
    </div>
    <q-slide-transition>
      <div v-show="visible">
        <q-page-container class="flex flex-center q-pa-md row q-gutter-lg">
          <FoodCard
            v-for="foods in recommend.slice(1, 9)"
            :key="foods.id"
            :foods="foods"
            :checkFav="keep.includes(foods.id) ? true : false"
            @click="refresh"
          />
        </q-page-container>
      </div>
    </q-slide-transition>
  </div>
</template>
<script>
import { ref } from "vue";
import FoodCard from "components/FoodCard.vue";
import FoodService from "src/boot/FoodService";
export default {
  components: {
    FoodCard,
  },
  name: "FoodDetail",
  data() {
    return {
      food: "",
      recommend: "",
      ingredient: [],
      instruction: [],
      keep: [],
    };
  },
  setup() {
    return {
      contentStyle: {
        backgroundColor: "rgba(0,0,0,0.02)",
        color: "#555",
      },
      thumbStyle: {
        right: "2px",
        borderRadius: "5px",
        backgroundColor: "#027be3",
        width: "5px",
        opacity: 0.75,
      },
      visible: ref(false),
    };
  },
  methods: {
    refresh() {
      this.$router.go();
    },
  },
  created() {
    FoodService.getFoodByID(this.$route.params.id).then((response) => {
      this.food = response.data;
      this.ingredient = response.data.ingredient.split("', '");
      this.ingredient[0] = this.ingredient[0].replace("'", "");
      this.ingredient[this.ingredient.length - 1] = this.ingredient[
        this.ingredient.length - 1
      ].replace("'", "");
      this.instruction = response.data.instruction.split(". ");
      FoodService.foodSearching(response.data.title, "Title", 1).then(
        (response) => {
          (this.recommend = response.data[2]),
            FoodService.getFavoriteFood().then((responser) => {
              for (let i = 0; i < responser.data.length; i++) {
                this.keep.push(responser.data[i].id);
              }
            });
        }
      );
    });
  },
};
</script>