import api from "../../shared/lib/axios";

export function createVoucher({ meal_plan_id }) {
  return api.post("/voucher/create", { meal_plan_id }).then(res => res.data);
}

export function deleteVoucher({ voucher_id }) {
  return api.post("/voucher/delete", { voucher_id }).then(res => res.data);
}

export function checkVoucherExists({ meal_plan_id }) {
  return api.post("/voucher/exists", { meal_plan_id }).then(res => res.data);
}

export function getBranchVouchers({ meal_plan_id }) {
  return api.post("/voucher/branch", { meal_plan_id }).then(res => res.data);
}

export function getMealPlanVouchersForAdmin({ meal_plan_id }) {
  return api.post("/voucher/admin/mealplan", { meal_plan_id }).then(res => res.data);
}

export function createVoucherBranch({ meal_plan_id, public_ids }) {
  return api.post("/voucher/branch/create/list", {
    meal_plan_id,
    public_ids,
  }).then(res => res.data);
}

export function deleteVoucherBranch({ voucher_id, public_id }) {
  return api.post("/voucher/branch/delete/user", {
    voucher_id,
    public_id,
  }).then(res => res.data);
}

export function getVoucherReport({ meal_plan_id, branch_id }) {
  return api.get("/voucher/report", {
    params: { meal_plan_id, branch_id },
    responseType: "arraybuffer",
  });
}
