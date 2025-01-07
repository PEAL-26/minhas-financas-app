import { router } from "expo-router";
import { View } from "react-native";
import { Text } from "../text";
import { Button } from "../button";

interface Props {
  refetch?(): void;
  buttonBack?: boolean;
  buttonRefresh?: boolean;
}

export function ErrorPage(props: Props) {
  const { refetch, buttonBack = true, buttonRefresh = true } = props;

  return (
    <View className="flex-1 gap-6 flex-col justify-center items-center">
      <Text className="text-gray-2 font-medium text-xs text-center max-w-lg">
        Oops! Algo deu errado, recarregue e se o erro persistir entre em
        contanto com o suporte.
      </Text>
      <View className="flex-row gap-2 items-center mt-2">
        {buttonBack && (
          <Button
            onPress={() => router.back()}
            className="bg-white p-2 rounded w-24 justify-center items-center"
            textClassName="text-center"
          >
            Voltar
          </Button>
        )}
        {buttonRefresh && (
          <Button
            onPress={() => refetch?.()}
            className="bg-black p-2 rounded w-24 justify-center items-center"
            textClassName="text-white text-center"
          >
            Recarregar
          </Button>
        )}
      </View>
    </View>
  );
}
