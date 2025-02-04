import { useDebounce } from '@uidotdev/usehooks';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
  PlusIcon,
} from 'lucide-react-native';
import { useMemo, useState } from 'react';
import { useWindowDimensions, View } from 'react-native';

import { useQueryPagination } from '@/hooks/use-query-pagination';
import { cn } from '@/lib/utils';
import { dataTableListDataService } from '@/services/database';

import { ActivityIndicator } from 'react-native';
import { RegisterDataTableModal } from '../modals/register-data-table-modal';
import { Button } from './button';
import { FlashList } from './flash-list';
import { Input } from './input';
import { Loading } from './loading';
import { SelectData } from './select-data';
import { Text } from './text';

const SIZES = [
  { number: 10, title: 'Mostrar 10' },
  { number: 20, title: 'Mostrar 20' },
  { number: 30, title: 'Mostrar 30' },
  { number: 40, title: 'Mostrar 40' },
  { number: 50, title: 'Mostrar 50' },
];

interface DataTableProps {
  table: { name: string; columns?: string } | null;
}

export function DataTableRender(props: DataTableProps) {
  const { table } = props;
  const window = useWindowDimensions();

  const [registerDataTableModal, setRegisterDataTableModal] = useState<{
    registerId?: number;
    tableName?: string;
    columns?: { title: string; name: string }[];
    show: boolean;
  }>({ show: false });

  const [query, setQuery] = useState('');
  const debouncedQuery = useDebounce(query, 300);
  const [size, setSize] = useState(10);
  const [page, setPage] = useState(1);

  const response = useQueryPagination({
    fn: () =>
      table
        ? dataTableListDataService(
            {
              table: table.name,
              columns: table.columns,
            },
            { page, size, query: debouncedQuery },
          )
        : undefined,
    queryKey: ['data-tables-list', page, size, table?.name, debouncedQuery],
  });

  const { columns, fieldId } = useMemo(() => {
    let fieldId = '';
    let columns: { title: string; name: string; pk: boolean }[] = [];

    if (table) {
      table?.columns?.split(';').forEach((column, index) => {
        const columnSplitted = column.split(' AS ').map((str) => str.trim());
        if (index === 0) fieldId = columnSplitted[1];
        columns.push({
          pk: index === 0,
          title: columnSplitted[1],
          name: columnSplitted[0],
        });
      });
    }
    return { columns, fieldId };
  }, [table]);

  if (!table) {
    return (
      <View className="flex-1 items-center justify-center">
        <Text className="text-center">Nenhuma tabela de dados selecionada</Text>
      </View>
    );
  }

  const handleCloseRegisterDataTableModal = () => {
    setRegisterDataTableModal({ show: false });
  };

  return (
    <>
      <View className="mb-4 flex-row items-center gap-2">
        <Input className="w-full flex-1" placeholder="Pesquisar..." onChangeText={setQuery} />
        <Button
          icon={PlusIcon}
          className="h-10 w-10 items-center justify-center rounded-full bg-white"
          onPress={() =>
            setRegisterDataTableModal({
              show: true,
              tableName: table.name,
              columns,
            })
          }
        />
      </View>

      {response.isLoading && <Loading />}

      {response.isError && (
        <View
          style={{ height: window.height - 300 }}
          className="items-center justify-center rounded bg-white"
        >
          <Text className="mb-4 text-center text-xs">Falha ao carregar a tabela de dados!</Text>
          <Button onPress={response.refetch}>Recarregar</Button>
        </View>
      )}

      {!response.isLoading && !response.isError && (
        <>
          <View className="flex flex-row items-center rounded-t border-b border-b-gray-200 bg-white p-2">
            {columns.map((column, key) => (
              <Text
                key={key}
                className={cn(
                  'px-2 text-sm font-bold uppercase',
                  column.pk ? 'w-10 text-center' : 'flex-1',
                )}
              >
                {column?.title || ''}
              </Text>
            ))}
          </View>

          <FlashList
            data={response.isLoading ? [] : response.data}
            keyExtractor={(item) => String(item[fieldId])}
            renderItem={({ item, index }) => (
              <View key={index} className="flex flex-row items-center p-2">
                {columns.map((column, key) => {
                  return (
                    <Text
                      key={key}
                      className={cn(
                        'px-2 text-xs',
                        column.pk ? 'w-10 text-center' : 'line-clamp-1 flex-1',
                      )}
                    >
                      {item[column.title]}
                    </Text>
                  );
                })}
              </View>
            )}
            ListFooterComponent={() => (
              <>
                {response.isFetching && (
                  <View className="h-20 flex-row items-center justify-center">
                    <ActivityIndicator color={'#000'} size={'small'} />
                  </View>
                )}
                <View className="flex flex-row items-center justify-between rounded-b border-t border-t-gray-200">
                  <View className="py-2 pl-3">
                    <Text className="text-xs">{`${response.totalItems || 0} item(s)`}</Text>
                  </View>
                  <View className="py-2 pl-3">
                    <SelectData
                      labelField="title"
                      data={SIZES}
                      defaultValue={SIZES.find((s) => s.number === size)}
                      placeholder="Mostrar 10"
                      className="w-fit border-0 p-0"
                      containerClassName="p-0 flex-1 w-[1%] border-0"
                      onSelect={(item) => {
                        setSize(item.number);
                      }}
                      dropdownWith={100}
                    />
                  </View>
                  <View className="flex flex-row items-center py-2 pr-3">
                    <Button
                      icon={ChevronsLeftIcon}
                      disabled={!response.prev}
                      onPress={() => setPage(1)}
                    />
                    <Button
                      icon={ChevronLeftIcon}
                      disabled={!response.prev}
                      onPress={() => setPage((prev) => prev - 1)}
                    />
                    <Text>{response.currentPage || 0}</Text>
                    <Text>/</Text>
                    <Text>{response.totalPages || 0}</Text>
                    <Button
                      icon={ChevronRightIcon}
                      disabled={!response.next}
                      onPress={() => setPage((prev) => prev + 1)}
                    />
                    <Button
                      icon={ChevronsRightIcon}
                      disabled={!response.next}
                      onPress={() => response.totalPages && setPage(response.totalPages)}
                    />
                  </View>
                </View>
              </>
            )}
            ListEmptyComponent={
              !response.isFetching && response.isEmpty ? (
                <View
                  style={{
                    height: 200,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: '#fff',
                  }}
                >
                  <Text className="max-w-[250px] text-center text-sm">
                    {query ? 'Nenhum dado encontrado' : 'Sem nenhum dado cadastrado'}
                  </Text>
                </View>
              ) : null
            }
            contentContainerStyle={{ backgroundColor: '#fff' }}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            estimatedItemSize={32}
          />
        </>
      )}

      {registerDataTableModal.show && (
        <RegisterDataTableModal
          open={registerDataTableModal.show}
          onClose={handleCloseRegisterDataTableModal}
          info={registerDataTableModal}
          onSubmit={response.refetch}
        />
      )}
    </>
  );
}
