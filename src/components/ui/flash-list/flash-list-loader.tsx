import { cn } from '@/lib/utils';
import { ActivityIndicator, View } from 'react-native';
import { FlashListError } from './flash-list-error';
import { FlashListLoaderProps } from './types';

export function FlashListLoader(props: FlashListLoaderProps) {
  const { isError, isLoading, refetch } = props;
  if (!isLoading && !isError) return null;

  if (isError) {
    return <FlashListError refetch={refetch} />;
  }

  if (isLoading) {
    return <ActivityIndicator animating size={16} color={'#000'} />;
  }
}

export function setFlashListLoader(
  isLoading?: boolean,
  isError?: boolean,
  refetch?: () => void,
  config?: { className?: string; height?: number },
) {
  const { className, height } = config || {};
  return (
    <View
      style={{ height, paddingTop: 16 }}
      className={cn('w-full items-center justify-center p-4', className)}
    >
      <FlashListLoader isLoading={isLoading} isError={isError} refetch={refetch} />
    </View>
  );
}
