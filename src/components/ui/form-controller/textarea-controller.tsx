import { Control, FieldValues, Path } from 'react-hook-form';
import { View } from 'react-native';

import { cn } from '@/lib/utils';
import { Label } from '../label';
import { Text } from '../text';
import { Textarea, TextareaProps } from '../textarea';
import { FormController } from './form-controller';

type Props<TFieldValues extends FieldValues = FieldValues, TContext = any> = TextareaProps & {
  label?: string;
  isLoading?: boolean;
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  containerClassName?: string;
};

export function TextareaController<TFieldValues extends FieldValues = FieldValues, TContext = any>(
  props: Props<TFieldValues, TContext>,
) {
  const { name, control, defaultValue, label, containerClassName, ...rest } = props;
  return (
    <FormController defaultValue={defaultValue} name={name} control={control}>
      {({ field, fieldState }) => (
        <View className={cn('flex flex-col', containerClassName)}>
          {label && <Label className="mb-2">{label}</Label>}
          <Textarea {...rest} {...field} onChangeText={(text) => field.onChange(text)} />
          {fieldState?.error?.message && (
            <Text className="mt-1F text-xs text-red-500">{fieldState?.error?.message}</Text>
          )}
        </View>
      )}
    </FormController>
  );
}
