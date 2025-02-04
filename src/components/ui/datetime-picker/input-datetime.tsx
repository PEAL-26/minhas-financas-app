import { formatDate } from '@/helpers/date';
import { ElementRef, forwardRef, useCallback, useEffect, useState } from 'react';
import { Pressable, TextInput } from 'react-native';
import { Input } from '../input';
import { DatetimePicker, DatetimePickerProps } from './datetime-picker';

export interface InputDatetimeProps {
  value?: Date | null;
  defaultValue?: Date | null;
  mode?: 'date' | 'time' | 'datetime';
  onChange?(date?: Date | null): void;
  isLoading?: boolean;
  datetimePickerProps?: Partial<DatetimePickerProps>;
}

export const InputDatetime = forwardRef<ElementRef<typeof TextInput>, InputDatetimeProps>(
  (props, ref) => {
    const { value, defaultValue, mode = 'date', onChange, isLoading, datetimePickerProps } = props;
    const [openDatetimePicker, setOpenDatetimePicker] = useState(false);
    const [currentValue, setCurrentValue] = useState(() => defaultValue);

    const handleChangeValue = useCallback(
      (date?: Date | null, press = false) => {
        setCurrentValue(date);

        if (press) {
          onChange?.(date);
        }
      },
      [onChange],
    );

    useEffect(() => {
      handleChangeValue(value);
    }, [handleChangeValue, value]);

    const getValue = () => {
      const date = currentValue || new Date();
      return formatDate(date);
    };

    return (
      <>
        <Pressable disabled={isLoading} onPress={() => setOpenDatetimePicker(true)}>
          <Input ref={ref} editable={false} value={getValue()} />
        </Pressable>

        <DatetimePicker
          {...datetimePickerProps}
          open={openDatetimePicker}
          onChange={(date) => {
            handleChangeValue(date, true);
          }}
          mode={mode}
        />
      </>
    );
  },
);

InputDatetime.displayName = 'InputDatetime';
