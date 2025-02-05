import { ActivityIndicator, View } from 'react-native';

interface Props {
  backgroundColor?: string;
  color?: string;
  size?: number | 'small' | 'large';
  height?: number;
}

export function Loading(props: Props) {
  const { backgroundColor = 'transparent', color = '#000', size = 'small', height } = props;

  return (
    <View
      style={[
        {
          height,
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
