import api from "../../shared/lib/axios";

export function createMealPlan({ plan_date, meal_id }) {
  return api
    .post("/meal_plans/create", null, {
      params: { plan_date, meal_id },
    })
    .then((res) => res.data);
}

export function getWeekMealPlans(plan_date) {
  return api
    .get("/meal_plans/week", {
      params: { plan_date },
    })
    .then((res) => res.data.root);
}

export function updateMealPlan({ plan_id, meal_id }) {
  return api
    .put(`/meal_plans/update/${plan_id}`, null, {
      params: { meal_id },
    })
    .then((res) => res.data);
}

export function deleteMealPlan(plan_id) {
  return api
    .delete(`/meal_plans/delete/${plan_id}`)
    .then((res) => res.data);
}
