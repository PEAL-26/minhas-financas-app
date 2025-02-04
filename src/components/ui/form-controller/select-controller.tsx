import { View } from "react-native";
import { Control, FieldValues, Path } from "react-hook-form";

import { SelectData, SelectDataProps } from "../select-data";
import { Text } from "../text";
import { FormController } from "./form-controller";
import { Label } from "../label";
import { cn } from "@/lib/utils";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TData = any
> = SelectDataProps<TData> & {
  label?: string;
  isLoading?: boolean;
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  containerClassName?: string;
};

export function SelectController<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TData = any
>(props: Props<TFieldValues, TContext, TData>) {
  const {
    name,
    control,
    defaultValue,
    label,
    containerClassName,
    isLoading,
    ...rest
  } = props;
  return (
    <FormController defaultValue={defaultValue} name={name} control={control}>
      {({ field, fieldState }) => (
        <View className={cn("flex flex-col", containerClassName)}>
          {label && <Label className="mb-2">{label}</Label>}
          <SelectData
            {...rest}
            {...field}
            disabled={isLoading || rest?.disabled}
            onSelect={(item, index) => {
              field.onChange(item);
              props?.onSelect?.(item, index);
            }}
          />
          {fieldState?.error?.message && (
            <Text className="text-xs text-red-500 mt-1">
              {fieldState?.error?.message}
            </Text>
          )}
        </View>
      )}
    </FormController>
  );
}
