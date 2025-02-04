import { router } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../button';
import { Text } from '../text';

interface Props {
  refetch?(): void;
  buttonBack?: boolean;
  buttonRefresh?: boolean;
}

export function ErrorPage(props: Props) {
  const { refetch, buttonBack = true, buttonRefresh = true } = props;

  return (
    <View className="flex-1 flex-col items-center justify-center gap-6">
      <Text className="text-gray-2 max-w-lg text-center text-xs font-medium">
        Oops! Algo deu errado, recarregue e se o erro persistir entre em contanto com o suporte.
      </Text>
      <View className="mt-2 flex-row items-center gap-2">
        {buttonBack && (
          <Button
            onPress={() => router.back()}
            className="w-24 items-center justify-center rounded bg-white p-2"
            textClassName="text-center"
          >
            Voltar
          </Button>
        )}
        {buttonRefresh && (
          <Button
            onPress={() => refetch?.()}
            className="w-24 items-center justify-center rounded bg-black p-2"
            textClassName="text-white text-center"
          >
            Recarregar
          </Button>
        )}
      </View>
    </View>
  );
}
