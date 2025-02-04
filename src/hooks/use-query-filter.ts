import { PaginatedResult } from '@/db/database';
import { useState } from 'react';
import { useQueryPagination } from './use-query-pagination';

interface Props<TData> {
  fn: (filters?: any) => Promise<PaginatedResult<TData>>;
  defaultFilters?: Record<string, any>;
  queryKey?: string[];
}

export function useQueryFilter<TData = any>(props: Props<TData>) {
  const { fn, defaultFilters = { query: '', page: 1, size: 10 }, queryKey = [] } = props;
  const [filters, setFilters] = useState<Record<string, any>>(() => defaultFilters);

  const handleFilter = (filter: Record<string, any>) => {
    setFilters((prev) => ({ ...prev, filter }));
  };

  const clearFilters = () => {
    setFilters({});
  };

  const query = useQueryPagination({
    fn: () => fn(filters),
    queryKey: [...queryKey, { ...filters }],
  });

  return { ...query, filters, handleFilter, clearFilters };
}
