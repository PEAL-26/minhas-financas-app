import { PRIORITY_COLOR, PRIORITY_MAP } from '@/constants';
import { TouchableOpacity, View } from 'react-native';
import { BADGE_COLOR } from '../ui/badge';
import { Label } from '../ui/label';
import { Text } from '../ui/text';

interface Props {
  form: any;
  isLoading?: boolean;
}

export function PriorityComponent(props: Props) {
  const { form } = props;

  return (
    <View className="flex flex-row items-center justify-between gap-2">
      <Label htmlFor="priority">Prioridade</Label>
      <View className="flex flex-row items-center gap-2">
        {[0 as const, 1 as const, 2 as const].map((p, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => form.setValue('priority', p)}
            style={[
              {
                padding: 4,
                borderRadius: 4,
                backgroundColor:
                  p === form.watch('priority')
                    ? BADGE_COLOR[PRIORITY_COLOR[p]]?.bg
                    : p === 1
                      ? BADGE_COLOR[PRIORITY_COLOR[1]]?.bg
                      : undefined,
              },
            ]}
          >
            <Text
              style={{
                color: BADGE_COLOR[PRIORITY_COLOR[p]]?.text,
              }}
              className="text-xs"
            >
              {PRIORITY_MAP[p]}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
}
