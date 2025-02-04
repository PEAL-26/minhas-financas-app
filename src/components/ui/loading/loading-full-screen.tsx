import { Modal } from 'react-native';
import { Loading } from './loading';

interface Props {
  show?: boolean;
  backgroundColor?: string;
  color?: string;
  size?: number | 'small' | 'large';
}

export function LoadingFullScreen(props: Props) {
  const { show = true, backgroundColor = '#00000050', color = '#FFF', size = 'small' } = props;

  return (
    <Modal
      visible={show}
      onRequestClose={() => {}}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <Loading backgroundColor={backgroundColor} color={color} size={size} />
    </Modal>
  );
}
