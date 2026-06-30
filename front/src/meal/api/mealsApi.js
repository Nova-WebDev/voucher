import api from "../../shared/lib/axios";
import axiosMultipart from "../../shared/lib/axiosMultipart";

export function createMeal({ title, description, file }) {
  const form = new FormData();
  form.append("title", title);
  if (description) form.append("description", description);
  if (file) form.append("file", file);

  return axiosMultipart.post("/meals/create", form);
}

export function updateMeal({ meal_id, title, description, file }) {
  const form = new FormData();
  form.append("title", title);
  if (description) form.append("description", description);
  if (file) form.append("file", file);

  return axiosMultipart.put(`/meals/update/${meal_id}`, form);
}
export function getMeal(meal_id) {
  return api.get(`/meals/get/${meal_id}`).then((res) => res.data);
}

export function getMealImage(img_id) {
  return api.get(`/meals/image/${img_id}`, { responseType: "arraybuffer" });
}


export function toggleMealActive(meal_id, is_active) {
  return api.put(`/meals/active/${meal_id}`, null, {
    params: { is_active },
  });
}

export function listMeals() {
  return api.get("/meals/get-all").then((res) => res.data);
}
