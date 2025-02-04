import { View } from 'react-native';
import { Button } from '../button';
import { Text } from '../text';
import { FlashListErrorProps } from './types';

export function FlashListError({ refetch }: FlashListErrorProps) {
  return (
    <View className="flex-col items-center justify-center gap-6">
      <Text className="text-gray-2 max-w-lg text-center text-xs font-medium">
        Oops! Algo deu errado, recarregue e se o erro persistir entre em contanto com o suporte.
      </Text>
      <Button textClassName="text-brand font-bold text-base" onPress={() => refetch?.()}>
        Recarregar
      </Button>
    </View>
  );
}
