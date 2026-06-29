import api from "../../shared/lib/axios";

export function createBranch(data) {
  return api.post("/branch/create", data);
}

export function updateBranch(data) {
  return api.put("/branch/update", data);
}

export function deleteBranch(data) {
  return api.delete("/branch/delete", { data });
}

export function listBranches() {
  return api.get("/branch/list").then((res) => res.data);
}
