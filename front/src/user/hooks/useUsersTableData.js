import { useState, useMemo } from "react";
import { useGetUsersPaginated } from "../hooks/useGetUsersPaginated";

export function useUsersTableData(initial = {}) {
  const [page, setPage] = useState(initial.page || 1);
  const [limit, setLimit] = useState(initial.limit || 20);
  const [search, setSearch] = useState(initial.search || "");
  const [orderBy, setOrderBy] = useState(initial.orderBy || "created_at");
  const [deorder, setDeorder] = useState(initial.deorder || false);

  const query = useGetUsersPaginated({
    page,
    limit,
    search,
    order_by: orderBy,
    deorder,
  });

  const data = useMemo(() => {
    if (!query.data) return [];
    return query.data.users;
  }, [query.data]);

  const total = query.data?.total_count || 0;

  return {
    data,
    total,
    page,
    limit,
    search,
    orderBy,
    deorder,
    setPage,
    setLimit,
    setSearch,
    setOrderBy,
    setDeorder,
    isLoading: query.isLoading,
    isError: query.isError,
  };
}
