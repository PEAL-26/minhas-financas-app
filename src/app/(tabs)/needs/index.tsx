import { RefreshControl, View } from 'react-native';

import { NeedRegisterModal } from '@/components/modals';
import { NeedListingCard } from '@/components/ui/cards';
import { FlashList, setFlashListLoader } from '@/components/ui/flash-list';
import { SwipeableActions } from '@/components/ui/swipeable';
import { useQueryPagination } from '@/hooks/use-query-pagination';
import { useRemove } from '@/hooks/use-remove';
import { listNeeds } from '@/services/needs';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { useState } from 'react';

export default function NeedsScreen() {
  const [needModal, setNeedModal] = useState<{
    show?: boolean;
    id?: number;
  }>({});

  const queryKey = ['needs'];

  const { data, isLoading, isFetching, isError, refetch } = useQueryPagination({
    fn: () => listNeeds(),
    queryKey,
  });

  const { handleRemove } = useRemove({
    tableName: 'needs',
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
                setNeedModal({ id: item.id, show: true });
              }}
              onDelete={() => {
                handleRemove({ id: item.id });
              }}
            >
              <NeedListingCard
                data={item}
                onPress={() => router.push(`/(tabs)/needs/${item.id}`)}
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

      {needModal.show && (
        <NeedRegisterModal
          show={needModal.show}
          needId={needModal.id}
          onClose={() => setNeedModal({})}
        />
      )}
    </>
  );
}
