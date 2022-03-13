<template>
  <q-page-container class="flex flex-center q-pa-md q-gutter-lg">
    <Form @submit="searchFood" style="width: 90%">
      <div class="row">
        <div class="col-9" style="margin-right: 1%">
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
            <div name="choose">
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
            </div>
          </Field>
        </div>
        <div class="col-2">
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
      </div>
    </Form>
  </q-page-container>
  <div class="text-h6 flex flex-center">
    <b>Total Food found: </b>
    <span style="color: green"> {{ foodCount[0] }}</span>
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
import BaseInput from "components/BaseInput.vue";
import FoodCard from "components/FoodCard.vue";
import Button from "components/Button.vue";
import FoodService from "boot/FoodService.js";
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
      maxPage: 0,
      keep: [],
    };
  },
  setup() {
    return {
      search: "",
      choice: ref("Title"),
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
  methods: {
    searchFood() {
      FoodService.foodSearching(this.search, this.choice, 1).then(() => {
        this.$router.push({
          name: "SearchResult",
          params: { keyword: this.search, types: this.choice },
        });
      });
    },
  },
  created() {
    FoodService.getAllFoodWithPagination(this.page).then((response) => {
      (this.foodCount = response.data[0]),
        (this.food = response.data[1]),
        (this.maxPage = (parseInt(response.data[0] / 10) + 1).toFixed(0)),
        FoodService.getFavoriteFood().then((response) => {
          for (let i = 0; i < response.data.length; i++) {
            this.keep.push(response.data[i].id);
          }
        });
    });
  },
  beforeRouteEnter(routeTo, routeFrom, next) {
    FoodService.getAllFoodWithPagination(
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      next((compute) => {
        compute.food = response.data[1];
      });
    });
  },
  beforeRouteUpdate(routeTo) {
    FoodService.getAllFoodWithPagination(
      parseInt(routeTo.query.page) || 1
    ).then((response) => {
      this.food = response.data[1];
    });
  },
};
</script>