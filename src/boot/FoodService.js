import apiClient from "boot/axios.js";
import AuthService from "./AuthService";

export default {
    getAllFoodWithPagination(page) {
        return apiClient.get("/getAllData/page=" + page);
    },
    getFoodByID(id) {
        return apiClient.get("/getFood/" + id);
    },
    addFavoriteFood(food_id) {
        return apiClient.post("/addFavorite", {
            user_id: AuthService.getUser().id,
            food_id: food_id
        });
    },
    removeFavoriteFood(food_id) {
        return apiClient.post("/removeFavorite", {
            user_id: AuthService.getUser().id,
            food_id: food_id
        });
    },
    getFavoriteFood() {
        return apiClient.post("/getFavorite", {
            user_id: AuthService.getUser().id,
        });
    },
    foodSearching(food, type, page) {
        return apiClient.post("/TF-IDFsearch/page=" + page, {
            user_id: AuthService.getUser().id,
            query: food,
            type: type
        });
    }
}
