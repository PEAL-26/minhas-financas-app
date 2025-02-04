import { router } from 'expo-router';
import { View } from 'react-native';
import { Button } from '../button';
import { Text } from '../text';

interface Props {
  title?: string;
  refetch?(): void;
}

export function NotFoundPage(props: Props) {
  const { refetch, title = 'Recurso não encontrado!' } = props;

  return (
    <View className="flex-1 items-center justify-center">
      <Text>{title}</Text>
      <View className="mt-2 flex-row items-center gap-2">
        <Button
          onPress={() => router.back()}
          className="w-24 items-center justify-center rounded bg-white p-2"
          textClassName="text-center"
        >
          Voltar
        </Button>
        <Button
          onPress={() => refetch?.()}
          className="w-24 items-center justify-center rounded bg-black p-2"
          textClassName="text-white text-center"
        >
          Recarregar
        </Button>
      </View>
    </View>
  );
}
