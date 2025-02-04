import { cn } from '@/lib/utils';
import { ChevronsUpDown } from 'lucide-react-native';
import { useEffect, useMemo, useState } from 'react';

import { ActivityIndicator, View } from 'react-native';
import { Button } from './button';
import { Text } from './text';

type ItemType = {
  id: string;
  title: string;
};

interface Props<T extends ItemType> {
  defaultItem?: T;
  item?: T;
  itemID?: any;
  items?: T[];
  placeholder?: string;
  onSelect?(item: T | null): void;
  isLoading?: boolean;
  openOutside?: boolean;
  onOpenOutside?(): void;
  className?: string;
  containerClassName?: string;
}

export function Select<T extends ItemType>(props: Props<T>) {
  const {
    item,
    itemID,
    items = [],
    onSelect,
    isLoading,
    openOutside = false,
    onOpenOutside,
    placeholder = 'Selecione um item',
    className,
    containerClassName,
  } = props;

  const defaultItem = useMemo(() => props?.defaultItem, [props?.defaultItem]);
  const [currentItem, setCurrentItem] = useState<T | undefined>();
  const [openModal, setOpenModal] = useState(false);

  const handleSelect = (data: T | null) => {
    setCurrentItem(data || undefined);
    onSelect?.(data || null);
  };

  const handleOpen = () => {
    if (isLoading) return;

    if (openOutside) {
      onOpenOutside?.();
      return;
    }

    setOpenModal(true);
  };

  useEffect(() => {
    if (!itemID) return;

    const item = items.find((i) => i.id === itemID);
    setCurrentItem(item);
  }, [itemID, items]);

  useEffect(() => {
    if (!item) return;

    setCurrentItem(item);
  }, [item]);

  const title = currentItem?.title
    ? currentItem?.title
    : defaultItem
      ? defaultItem.title
      : placeholder;

  return (
    <>
      <Button
        className={cn(
          'h-12 w-full flex-row items-center justify-between rounded-md border border-input bg-background px-3 text-xs',
          className,
        )}
        containerClassName={cn('w-full', containerClassName)}
        onPress={handleOpen}
      >
        <>
          <Text
            className={cn('text-xs', !currentItem?.title && !defaultItem?.title && 'text-gray-500')}
          >
            {title}
          </Text>
          <View className="flex-row items-center gap-2">
            {isLoading && <ActivityIndicator color="#9ca3af" animating size={14} />}
            <ChevronsUpDown size={14} color="#9ca3af" />
          </View>
        </>
      </Button>
    </>
  );
}
