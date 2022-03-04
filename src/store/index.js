/* import { store } from "quasar/wrappers";
import { createStore } from "vuex";

export default store(function () {
  const Store = createStore({
    modules: {},
    strict: process.env.DEBUGGING,
  });

  return Store;
}); */
import { reactive } from 'vue'
export default reactive({
  currentUser: JSON.parse(localStorage.getItem('user'))
})