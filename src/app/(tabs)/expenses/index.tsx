import { RefreshControl, View } from "react-native";

import { IncomeListingCard } from "@/components/ui/cards";
import { FlashList, setFlashListLoader } from "@/components/ui/flash-list";
import { colors } from "@/styles/colors";

export default function ExpensesScreen() {
  const data = Array.from({ length: 10 }).map((_, index) => ({
    id: index,
    title: `Titulo ${index}`,
    description: `Descrição ${index}`,
    date: new Date(),
    amount: 10.1,
    type: "unique" as const,
    return: null,
    status: "pending" as const,
  }));

  const isLoading = false;
  const isFetching = false;
  const isError = false;
  const refetch = () => {};

  return (
    <View className="flex h-full w-full flex-1 flex-col pb-[72px] px-4">
      <FlashList
        data={data}
        renderItem={({ item }) => <IncomeListingCard data={item} />}
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
        estimatedItemSize={146}
        onEndReachedThreshold={0.3}
        showsVerticalScrollIndicator={false}
        // onEndReached={loadNextPageData}
      />
    </View>
  );
}
