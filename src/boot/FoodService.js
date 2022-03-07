import apiClient from "boot/axios.js";

export default {
    getAllFoodWithPagination(page) {
        return apiClient.get("/getAllData/page=" + page);
    },
    getFoodByID(id) {
        return apiClient.get("/getFood/" + id);
    },
    addFavoriteFood(user_id, food_id) {
        return apiClient.post("/addFavorite", {
            user_id: user_id,
            food_id: food_id
        });
    },
    removeFavoriteFood(user_id, food_id) {
        return apiClient.post("/removeFavorite", {
            user_id: user_id,
            food_id: food_id
        });
    },
    getFavoriteFood(user_id) {
        return apiClient.post("/getFavorite", {
            user_id: user_id,
        });
    },
    foodSearching(food, type, page) {
        return apiClient.post("/TF-IDFsearch/page=" + page, {
            query: food,
            type: type
        });
    }
}
