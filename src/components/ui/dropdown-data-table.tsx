import { ChevronDownIcon } from 'lucide-react-native';
import { useMemo, useRef, useState } from 'react';
import { ActivityIndicator, Pressable, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { cn } from '@/lib/utils';

import { Button } from './button';
import { DropdownMenuTrigger } from './dropdown-menu';
import { Text } from './text';

interface Props {
  defaultItem?: any;
  items?: any[];
  placeholder?: string;
  onSelect?(item: any | null): void;
  isLoading?: boolean;
  openOutside?: boolean;
  onOpenOutside?(): void;
  className?: string;
  containerClassName?: string;
}

export const DropdownDataTable = (props: Props) => {
  const {
    items = [],
    onSelect,
    isLoading,
    openOutside = false,
    onOpenOutside,
    placeholder = 'Selecione um item',
    className,
    containerClassName,
  } = props;
  const triggerRef = useRef<React.ElementRef<typeof DropdownMenuTrigger>>(null);
  const insets = useSafeAreaInsets();
  const contentInsets = {
    top: insets.top,
    bottom: insets.bottom,
    left: 12,
    right: 12,
  };

  const defaultItem = useMemo(() => props?.defaultItem, [props?.defaultItem]);
  const [currentItem, setCurrentItem] = useState<any | undefined>();

  const title = currentItem?.title
    ? currentItem?.title
    : defaultItem
      ? defaultItem.title
      : placeholder;

  const buttonRef = useRef();

  console.log(buttonRef.current);

  return (
    <View className="relative items-center justify-center gap-12 p-6">
      <Button
        ref={buttonRef.current}
        className={cn(
          'h-12 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 text-xs',
          className,
        )}
        containerClassName={cn('w-full', containerClassName)}
        // onPress={handleOpen}
      >
        <>
          <Text
            className={cn('text-xs', !currentItem?.title && !defaultItem?.title && 'text-gray-500')}
          >
            {title}
          </Text>
          <View className="flex-row items-center gap-2">
            {isLoading && <ActivityIndicator color="#9ca3af" animating size={14} />}
            <ChevronDownIcon size={14} color="#9ca3af" />
          </View>
        </>
      </Button>
      <Pressable style={[contentInsets]} className="bg-black">
        {/* <Pressable
        className="absolute top-0 right-0 w-16 h-16 active:bg-primary/5"
        onPress={() => {
          triggerRef.current?.open();
        }}
      /> */}
        <View></View>
      </Pressable>
    </View>
  );
};
