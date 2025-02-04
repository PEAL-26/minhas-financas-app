import { Control, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';

import { cn } from '@/lib/utils';
import { InputDatetime, InputDatetimeProps } from '../datetime-picker';
import { Label } from '../label';
import { Text } from '../text';
import { FormController } from './form-controller';

type Props<TFieldValues extends FieldValues = FieldValues, TContext = any> = InputDatetimeProps & {
  label?: string;
  isLoading?: boolean;
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  containerClassName?: string;
};

export function InputDatetimeController<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
>(props: Props<TFieldValues, TContext>) {
  const { name, control, defaultValue, label, containerClassName, isLoading, ...rest } = props;
  return (
    <FormController defaultValue={defaultValue} name={name} control={control}>
      {({ field, fieldState }) => (
        <View className={cn('flex flex-col', containerClassName)}>
          {label && <Label className="mb-2">{label}</Label>}
          <InputDatetime
            {...rest}
            {...field}
            isLoading={isLoading}
            onChange={(text) => {
              field.onChange(text);
            }}
          />
          {fieldState?.error?.message && (
            <Text className="mt-1 text-xs text-red-500">{fieldState?.error?.message}</Text>
          )}
        </View>
      )}
    </FormController>
  );
}
