import api from "../../shared/lib/axios";

export function createUser(data) {
  return api.post("/user/create", data);
}

export function updateUser(data) {
  return api.put("/user/update", data);
}

export function updateMyName(newName) {
  return api.put("/user/update-my-name", { new_name: newName });
}

export function getUsersPaginated(params) {
  return api.get("/user/paginated", { params });
}

export function getUsersByPublicIds(public_ids) {
  return api.post("/user/by-public-ids", { public_ids });
}

export function getMyProfile() {
  return api.get("/user/me");
}

export function blockUser(data) {
  return api.put("/user/block", data);
}
