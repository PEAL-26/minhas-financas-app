// import { useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { InputAutocompleteProps } from './types';

export function useInputAutocomplete<TData extends Object>(props: InputAutocompleteProps<TData>) {
  const {
    queryKey,
    queryFn,
    data,
    isLoading,
    labelProperty: propertySearch = 'name',
    defaultValue = '',
    onSelectionChange,
    onChangeText,
    onLoading,
  } = props;

  // const queryClient = useQueryClient();
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const newQueryKey = [...(queryKey ? queryKey : []), query];

  // const { isLoading: isLoadingFn, data: dataUseQuery = [] } = useQuery({
  //   queryKey: newQueryKey,
  //   queryFn,
  // });

  // const queriedItens = useMemo(
  //   () => filter<TData>(data || dataUseQuery, propertySearch, query),
  //   [data, dataUseQuery, query],
  // );

  // const suggestions = useMemo(() => {
  //   if (isFocused) {
  //     return dataUseQuery;
  //   }

  //   // queriedItens.length === 1 && compare(queriedItens[0], propertySearch, query)
  //   //   ? []
  //   //   : queriedItens;

  //   return dataUseQuery;
  // }, [dataUseQuery, query, isFocused]);

  // console.log(JSON.stringify(dataUseQuery, null, 2))
  const handleSelectionChange = (value: TData) => {
    console.log(value);
    // setQuery(value);
    // onSelectionChange?.(value);
    // queryClient.cancelQueries({ queryKey: newQueryKey });
  };

  useEffect(() => {
    setQuery(defaultValue);
  }, [defaultValue]);

  useEffect(() => {
    onChangeText?.(query);
  }, [query]);

  // useEffect(() => {
  //   onLoading?.(isLoading || isLoadingFn);
  // }, [isLoading, isLoadingFn]);

  // useEffect(() => {
  //   if (!isFocused) {
  //     queryClient.cancelQueries({ queryKey: newQueryKey });
  //   }
  // }, [isFocused]);

  return {
    isLoading,
    // suggestions,
    query,
    isFocused,
    handleSelectionChange,
    setQuery,
    setIsFocused,
  };
}
