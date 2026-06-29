import api from "../../shared/lib/axios";

export function getAllRecurringMealPlans() {
  return api.get("/meal-plan-recurring/get-all").then((res) => res.data);
}

export function insertRecurringMealPlans({ mapping }) {
  return api.post("/meal-plan-recurring/insert", { mapping });
}
