import api from "../../shared/lib/axios";

export function listTimePolicies() {
  return api.get("/meal-plan-time-policy/list").then((res) => res.data);
}

export function createTimePolicy(data) {
  return api.post("/meal-plan-time-policy/create", data).then((res) => res.data);
}

export function updateTimePolicy(data) {
  return api.put("/meal-plan-time-policy/update", data).then((res) => res.data);
}

export function deleteTimePolicy(policy_id) {
  return api
    .delete(`/meal-plan-time-policy/delete/${policy_id}`)
    .then((res) => res.data);
}
