import { CircularFinancialSummary } from '@/components/templates/dashboard';
import { TransactionListingCard } from '@/components/ui/cards';
import { FlashList, setFlashListLoader } from '@/components/ui/flash-list';
import { useQueryPagination } from '@/hooks/use-query-pagination';
import { listTransactions } from '@/services/transactions';
import { colors } from '@/styles/colors';
import { router } from 'expo-router';
import { Image, RefreshControl, Text, View } from 'react-native';

export default function DashboardScreen() {
  const { data, isLoading, isFetching, isError, refetch } = useQueryPagination({
    fn: () => listTransactions(),
    queryKey: ['transactions'],
  });

  return (
    <>
      <View className="flex h-14 flex-row items-center gap-2 bg-white p-4">
        <Image
          style={{ width: 40, height: 40 }}
          source={require('../../../assets/images/icon.png')}
        />
        <Text style={{ color: '#3D3D3D' }} className="text-lg font-bold">
          Minhas Finanças
        </Text>
      </View>

      <CircularFinancialSummary />

      <View className="flex h-full w-full flex-1 flex-col px-4 pb-[72px] pt-4">
        <FlashList
          data={data}
          renderItem={({ item }) => (
            <TransactionListingCard
              data={item}
              onPress={() => router.push(`/(tabs)/transactions/${item.id}`)}
            />
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
    </>
  );
}
