import { TransactionRegisterModal } from '@/components/modals';
import { TransactionListingCard } from '@/components/ui/cards';
import { FlashList, setFlashListLoader } from '@/components/ui/flash-list';
import { SwipeableActions } from '@/components/ui/swipeable';
import { useQueryPagination } from '@/hooks/use-query-pagination';
import { useRemove } from '@/hooks/use-remove';
import { listTransactions } from '@/services/transactions';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { useState } from 'react';
import { RefreshControl, View } from 'react-native';

export default function AllTransactionsScreen() {
  const [transactionModal, setTransactionModal] = useState<{
    show?: boolean;
    id?: number;
  }>({});

  const queryKey = ['transactions'];

  const { data, isLoading, isFetching, isError, refetch } = useQueryPagination({
    fn: () => listTransactions(),
    queryKey,
  });

  const { handleRemove } = useRemove({
    tableName: 'transactions',
    queryKey,
    refetch,
  });
  return (
    <>
      <View className="flex h-full w-full flex-1 flex-col px-4 pb-[72px]">
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <SwipeableActions
              onEdit={() => {
                setTransactionModal({ id: item.id, show: true });
              }}
              onDelete={() => {
                handleRemove({ id: item.id });
              }}
            >
              <TransactionListingCard
                data={item}
                onPress={() => router.push(`/(tabs)/transactions/${item.id}`)}
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
          estimatedItemSize={170}
          onEndReachedThreshold={0.3}
          showsVerticalScrollIndicator={false}
          // onEndReached={loadNextPageData}
        />
      </View>

      {transactionModal.show && (
        <TransactionRegisterModal
          show={transactionModal.show}
          transactionId={transactionModal.id}
          onClose={() => setTransactionModal({})}
        />
      )}
    </>
  );
}
