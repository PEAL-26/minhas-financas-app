import { MaterialIcons } from '@expo/vector-icons';
import { ColorValue, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { styles } from './styles';

type Props = TouchableOpacityProps & {
  icon: keyof typeof MaterialIcons.glyphMap;
  backgroundColor: ColorValue;
};

export function Option(props: Props) {
  const { icon, backgroundColor, ...rest } = props;

  return (
    <TouchableOpacity style={[styles.container, { backgroundColor }]} {...rest}>
      <MaterialIcons name={icon} color="#fff" size={24} />
    </TouchableOpacity>
  );
}
