<template>
  <q-page-container class="flex flex-center q-pa-md q-gutter-lg">
    <Form @submit="searchFood" style="width: 90%">
      <div class="row">
        <div class="col-9" style="margin-right: 2%">
          <Field name="search" v-slot="{ value, field }" v-model="search">
            <BaseInput
              label="Search food"
              name="search"
              :modelValue="value"
              :vBind="field"
            />
          </Field>
        </div>
        <div class="col-2">
          <Field name="choice" v-slot="{ value, field }">
            <q-select
              rounded
              outlined
              name="choice"
              v-model="choice"
              label="Search by.."
              :options="['Title', 'Ingredient', 'Favorite']"
              :modelValue="value"
              :vBind="field"
            />
          </Field>
        </div>
      </div>
      <div class="row">
        <div class="col-2" style="margin-right: 3%">
          <Button
            type="submit"
            label="Search"
            bgColor="#176492"
            color="white"
            borderRadius="50px"
            width="100%"
            padding="0"
            fontSize="18px"
            :disabled="!search"
            name="submitSearch"
          />
        </div>
        <div class="col-8 text-h6" v-if="suggestCorrect != ''">
          Or do you mean
          <b style="color: red; cursor: pointer" @click="getCorrectFood">{{
            suggestCorrect
          }}</b
          >?
        </div>
      </div>
    </Form>
  </q-page-container>
  <div class="text-h6 flex flex-center">
    <b>Total Food found: </b> <span style="color: green"> {{ foodCount }}</span>
  </div>
  <q-page-container class="flex flex-center q-pa-md row q-gutter-lg">
    <FoodCard
      v-for="foods in food"
      :key="foods.id"
      :foods="foods"
      :checkFav="keep.includes(foods.id) ? true : false"
    />
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
    <div class="text-subtitle1">{{ page }}/{{ maxPage }}</div>
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
</template>
<script>
import { Form, Field } from "vee-validate";
import { ref } from "vue";
import Button from "components/Button.vue";
import FoodCard from "components/FoodCard.vue";
import FoodService from "boot/FoodService.js";
import BaseInput from "components/BaseInput.vue";
export default {
  components: {
    BaseInput,
    FoodCard,
    Button,
    Field,
    Form,
  },
  data() {
    return {
      food: null,
      foodCount: 0,
      suggestCorrect: null,
      maxPage: 0,
      keep: [],
    };
  },
  setup() {
    return {
      search: null,
      choice: ref("Title"),
    };
  },
  props: {
    page: {
      type: Number,
      required: true,
    },
    foodData: {
      type: String,
      required: true,
    },
    choose: {
      type: String,
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
  methods: {
    searchFood() {
      FoodService.foodSearching(this.search, this.choice, this.page).then(
        () => {
          this.$router
            .push({
              name: "SearchResult",
              params: { keyword: this.search, types: this.choice },
            })
            .then(() => {
              this.$router.go();
            });
        }
      );
    },
    getCorrectFood() {
      FoodService.foodSearching(
        this.suggestCorrect,
        this.choice,
        this.page
      ).then(() => {
        this.$router
          .push({
            name: "SearchResult",
            params: { keyword: this.suggestCorrect, types: this.choice },
          })
          .then(() => {
            this.$router.go();
          });
      });
    },
  },
  created() {
    FoodService.foodSearching(this.foodData, this.choose, this.page).then(
      (response) => {
        (this.foodCount = response.data[0]),
          (this.suggestCorrect = response.data[1]),
          (this.food = response.data[2]),
          (this.maxPage = (parseInt(response.data[0] / 10) + 1).toFixed(0)),
          FoodService.getFavoriteFood().then((responser) => {
            for (let i = 0; i < responser.data.length; i++) {
              this.keep.push(responser.data[i].id);
            }
          });
      }
    );
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    FoodService.foodSearching(
      routeTo.params.keyword,
      routeTo.params.types,
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      next((compute) => {
        compute.food = response.data[2];
      });
    });
  },
  beforeRouteUpdate(routeTo) {
    FoodService.foodSearching(
      routeTo.params.keyword,
      routeTo.params.types,
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      this.food = response.data[2];
    });
  },
};
</script>