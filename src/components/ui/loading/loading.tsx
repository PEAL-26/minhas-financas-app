import { ActivityIndicator, View } from 'react-native';

interface Props {
  backgroundColor?: string;
  color?: string;
  size?: number | 'small' | 'large';
}

export function Loading(props: Props) {
  const { backgroundColor = 'transparent', color = '#000', size = 'small' } = props;

  return (
    <View
      style={[
        {
          backgroundColor,
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
        },
      ]}
    >
      <ActivityIndicator color={color} size={size} />
    </View>
  );
}
