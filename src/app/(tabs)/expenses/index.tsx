import { RefreshControl, View } from "react-native";

import { ExpenseListingCard } from "@/components/ui/cards";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";
import { colors } from "@/styles/colors";

export default function ExpensesScreen() {
  const data = Array.from({ length: 5 }, (_, index) => ({
    id: index,
    title: `Despesa ${index + 1}`,
    description: `Descrição da despesa ${index + 1}`,
    date: new Date(),
    amount: 50 * (index + 1),
    priority: (index % 3) as 0 | 1 | 2,
    type: index % 2 === 0 ? ("unique" as const) : ("recurrent" as const),
    recurrence: index % 2 === 0 ? null : 30,
    status: index % 2 === 0 ? ("pending" as const) : ("done" as const),
  }));

  const isLoading = false;
  const isFetching = false;
  const isError = false;
  const refetch = () => {};

  return (
    <View className="flex h-full w-full flex-1 flex-col pb-[72px] px-4">
      <FlashList
        data={data}
        renderItem={({ item }) => <ExpenseListingCard data={item} />}
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
