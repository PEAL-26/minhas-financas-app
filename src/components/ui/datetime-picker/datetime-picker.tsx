import DateTimePickerModal, { DateTimePickerProps } from 'react-native-modal-datetime-picker';

export interface DatetimePickerProps
  extends Omit<DateTimePickerProps, 'onClose' | 'onCancel' | 'onConfirm'> {
  value?: Date;
  onChange?(date: Date | null): void;
  onClose?(): void;
  open: boolean;
  mode?: 'date' | 'time' | 'datetime';
}

export function DatetimePicker(props: DatetimePickerProps) {
  const { value, open, onClose, onChange, mode = 'date', ...rest } = props;

  const handleConfirm = (date: Date) => {
    onChange?.(date);
    onClose?.();
  };

  const handleCancel = () => {
    onClose?.();
  };

  return (
    <DateTimePickerModal
      {...rest}
      isVisible={open}
      mode={mode}
      date={open ? value : undefined}
      onConfirm={handleConfirm}
      onCancel={handleCancel}
    />
  );
}
