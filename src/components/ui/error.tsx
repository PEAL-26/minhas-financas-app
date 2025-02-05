import { View } from 'lucide-react-native';

import { Button } from './button';
import { Text } from './text';

interface Props {
  refetch?(): void;
  height?: number;
}

export function ErrorComponent(props: Props) {
  const { refetch, height } = props;

  return (
    <View
      style={{
        height,
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
      className="w-full flex-1 flex-col items-center justify-center gap-6"
    >
      <Text className="text-center text-xs font-medium text-zinc-600">
        Oops! Algo deu errado, recarregue e se o erro persistir entre em contanto com o suporte.
      </Text>
      <Button textClassName="text-primary font-bold text-base" onPress={() => refetch?.()}>
        Recarregar
      </Button>
    </View>
  );
}
