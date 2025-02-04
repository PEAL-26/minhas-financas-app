import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ChevronDownIcon, ChevronUpIcon } from 'lucide-react-native';
import { ElementRef, forwardRef } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

export interface SelectDataProps<T> {
  data: T[];
  defaultValue?: T;
  onSelect?(selectedItem: T, index: number): void;
  placeholder?: string;
  labelField?: keyof T;
  className?: string;
  containerClassName?: string;
  search?: boolean;
  dropdownWith?: number;
  disabled?: boolean;
}

export const SelectData = forwardRef<ElementRef<typeof SelectDropdown>, SelectDataProps<any>>(
  (props, ref) => {
    const {
      data,
      onSelect,
      placeholder = 'Selecione um item',
      labelField = 'name',
      search = false,
      className,
      containerClassName,
      defaultValue,
      dropdownWith,
      disabled,
    } = props;

    return (
      <SelectDropdown
        data={data}
        disabled={disabled}
        defaultValue={defaultValue}
        onSelect={(item, index) => onSelect?.(item, index)}
        dropdownOverlayColor="transparent"
        search={search ? true : undefined}
        searchPlaceHolder={search ? 'Pesquisar' : undefined}
        searchPlaceHolderColor={search ? '#6b7280' : undefined}
        renderButton={(selectedItem, isOpened) => {
          return (
            <Button
              disabled={disabled}
              className={cn(
                'h-10 w-full flex-row items-center justify-between gap-2 rounded-md border border-input bg-background px-3 text-xs',
                className,
              )}
              containerClassName={cn(containerClassName)}
              // onPress={handleOpen}
            >
              <>
                <Text className={cn('whitespace-nowrap text-xs', !selectedItem && 'text-gray-500')}>
                  {(selectedItem && selectedItem[labelField]) || placeholder}
                </Text>
                <View className="flex-row items-center gap-2">
                  {/* {isLoading && (
                  <ActivityIndicator color="#9ca3af" animating size={14} />
                )} */}
                  {isOpened ? (
                    <ChevronUpIcon size={14} color="#9ca3af" />
                  ) : (
                    <ChevronDownIcon size={14} color="#9ca3af" />
                  )}
                </View>
              </>
            </Button>
          );
        }}
        renderItem={(item, index, isSelected) => {
          return (
            <TouchableOpacity activeOpacity={0.6}>
              <View className="bg-white px-3 py-2">
                <Text>{item[labelField] || ''}</Text>
              </View>
            </TouchableOpacity>
          );
        }}
        showsVerticalScrollIndicator={false}
        dropdownStyle={{ ...styles.dropdownMenuStyle, width: dropdownWith }}
      />
    );
  },
);

SelectData.displayName = 'SelectData';

const styles = StyleSheet.create({
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: 8,
    marginTop: -25,
  },
});
