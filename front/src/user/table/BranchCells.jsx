import { useBranchStore } from "../../branch/store/branchStore";

export function BranchNameCell({ branchId }) {
  const branches = useBranchStore((s) => s.branches);
  const isSet = useBranchStore((s) => s.isSet);

  if (!isSet) return "—";

  return branches[branchId] ?? "—";
}

export function BranchRoleCell({ branchId, branchRole }) {
  const branches = useBranchStore((s) => s.branches);
  const isSet = useBranchStore((s) => s.isSet);

  if (!isSet) return "—";

  if (!branches[branchId]) return "—";

  return branchRole === 20 ? "Leader" : "Member";
}
