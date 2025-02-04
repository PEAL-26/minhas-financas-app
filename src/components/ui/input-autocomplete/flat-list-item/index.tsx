import { getValueObject } from '@/helpers/object';
import { FlatListProps, Text, TouchableOpacity } from 'react-native';

import { styles } from './styles';
import { FlatListItemProps } from './types';

export function FlatListItem<T extends object = any>(
  props: FlatListItemProps<T>,
): Partial<Omit<FlatListProps<T>, 'data'>> {
  const { valueProperty, labelProperty, onPress } = props;

  return {
    keyboardShouldPersistTaps: 'always',
    keyExtractor: (key: T) => getValueObject(key, String(valueProperty))?.toString() || '',
    renderItem: ({ item }) => (
      <TouchableOpacity
        style={styles.flatListItem}
        onPress={() => {
          console.log('clicou', item);
        }}
      >
        <Text numberOfLines={1} style={styles.text}>
          {getValueObject(item, String(labelProperty))}
        </Text>
      </TouchableOpacity>
    ),
    style: styles.flatList,
  };
}
