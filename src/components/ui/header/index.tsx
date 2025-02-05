import { shadowStyles } from '@/styles/styles';
import { router } from 'expo-router';
import { ArrowLeftIcon } from 'lucide-react-native';
import { View } from 'react-native';
import { Button } from '../button';
import { Text } from '../text';

interface Props {
  title: string;
  callback?: boolean;
}

export function Header(props: Props) {
  const { title, callback } = props;

  return (
    <View
      style={shadowStyles.shadow}
      className="flex h-14 flex-row items-center gap-2 bg-white p-4"
    >
      {callback && (
        <Button onPress={() => router.back()}>
          <ArrowLeftIcon color="#3D3D3D" size={20} />
        </Button>
      )}
      <Text style={{ color: '#3D3D3D' }} className="text-lg font-bold">
        {title}
      </Text>
    </View>
  );
}
