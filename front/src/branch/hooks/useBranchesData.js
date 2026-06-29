import { useEffect, useMemo, useState } from "react";
import { listBranches } from "../api/branchApi";
import { useBranchStore } from "../store/branchStore";

export function useBranchesData() {
  const { isSet, branches, setBranches } = useBranchStore();
  const [error, setError] = useState(null);

  const isLoading = !isSet;

  useEffect(() => {
    if (isSet) return; 

    let isMounted = true;

    listBranches()
      .then((res) => {
        if (!isMounted) return;
        setBranches(res.items);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
      });

    return () => {
      isMounted = false;
    };
  }, [isSet, setBranches]);

  const data = useMemo(() => branches, [branches]);

  return {
    isLoading,
    error,
    branches: data,
  };
}
