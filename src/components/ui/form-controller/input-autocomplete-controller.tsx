import { View } from "react-native";
import { Control, FieldValues, Path } from "react-hook-form";

import { Text } from "../text";
import { FormController } from "./form-controller";
import { Label } from "../label";
import { cn } from "@/lib/utils";
import {
  InputAutocomplete,
  InputAutocompleteProps,
} from "../input-autocomplete";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TData = any
> = InputAutocompleteProps<TData> & {
  label?: string;
  isLoading?: boolean;
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  containerClassName?: string;
};

export function InputAutocompleteController<
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
    valueProperty,
    labelProperty,
    data,
    queryFn,
    onSelectionDataChange,
    ...rest
  } = props;
  return (
    <FormController defaultValue={defaultValue} name={name} control={control}>
      {({ field, fieldState }) => (
        <View className={cn("flex flex-col gap-2", containerClassName)}>
          {label && <Label>{label}</Label>}
          <InputAutocomplete
            {...rest}
            {...field}
            onChangeText={(text) => {
              field.onChange(text);
            }}
          />
          {fieldState?.error?.message && (
            <Text className="text-xs text-red-500">
              {fieldState?.error?.message}
            </Text>
          )}
        </View>
      )}
    </FormController>
  );
}
