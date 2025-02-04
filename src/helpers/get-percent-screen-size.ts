import { Dimensions } from 'react-native';

interface ScreenSize {
  width: number;
  height: number;
}

export const getPercentScreenSize = (percentage: number): ScreenSize => {
  const fraction = percentage / 100;
  const { width, height } = Dimensions.get('window');
  return {
    width: width * fraction,
    height: height * fraction,
  };
};
