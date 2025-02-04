import { RefreshControl, View } from "react-native";

import { ExpenseListingCard } from "@/components/ui/cards";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";
import { colors } from "@/styles/colors";
import { SwipeableActions } from "@/components/ui/swipeable";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { listExpenses } from "@/services/expenses";

export default function ExpensesScreen() {
  const { data, isLoading, isFetching, isError, refetch } = useQueryPagination({
    fn: () => listExpenses(),
    queryKey: ["expenses"],
  });

  return (
    <View className="flex h-full w-full flex-1 flex-col pb-[72px] px-4">
      <FlashList
        data={data}
        renderItem={({ item }) => (
          <SwipeableActions>
            <ExpenseListingCard data={item} />
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
  );
}
