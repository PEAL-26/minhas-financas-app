import { RefreshControl, View } from 'react-native';

import { ExpenseRegisterModal } from '@/components/modals';
import { ExpenseListingCard } from '@/components/ui/cards';
import { FlashList, setFlashListLoader } from '@/components/ui/flash-list';
import { Header } from '@/components/ui/header';
import { SwipeableActions } from '@/components/ui/swipeable';
import { useQueryPagination } from '@/hooks/use-query-pagination';
import { useRemove } from '@/hooks/use-remove';
import { listExpenses } from '@/services/expenses';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { useState } from 'react';

export default function ExpensesScreen() {
  const [expenseModal, setExpenseModal] = useState<{
    show?: boolean;
    id?: number;
  }>({});

  const queryKey = ['expenses'];
  const { data, isLoading, isFetching, isError, refetch } = useQueryPagination({
    fn: () => listExpenses(),
    queryKey,
  });

  const { handleRemove } = useRemove({
    tableName: 'expenses',
    queryKey,
    refetch,
  });

  return (
    <>
      <Header title="Despesas" />
      <View className="flex h-full w-full flex-1 flex-col px-4 pb-[72px]  pt-4">
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <SwipeableActions
              onEdit={() => {
                setExpenseModal({ id: item.id, show: true });
              }}
              onDelete={() => {
                handleRemove({ id: item.id });
              }}
            >
              <ExpenseListingCard
                data={item}
                onPress={() => router.push(`/(tabs)/expenses/${item.id}`)}
              />
            </SwipeableActions>
          )}
          refreshing={isLoading}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={refetch}
              colors={[colors.primary.DEFAULT]}
            />
          }
          keyExtractor={(item) => String(item.id)}
          // ListHeaderComponent={header}
          ListFooterComponent={setFlashListLoader(isFetching, isError, refetch)}
          // ListEmptyComponent={
          //   isEmpty ? (
          //     <StatusScreen.ListEmpty
          //       style={{ height: height - 360 }}
          //       description="Sem clientes até o momento."
          //     />
          //   ) : null
          // }
          ItemSeparatorComponent={() => <View className="h-4" />}
          ListFooterComponentStyle={{ paddingVertical: 16 }}
          estimatedItemSize={126}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          // onEndReached={loadNextPageData}
        />
      </View>

      {expenseModal.show && (
        <ExpenseRegisterModal
          show={expenseModal.show}
          expenseId={expenseModal.id}
          onClose={() => setExpenseModal({})}
        />
      )}
    </>
  );
}
