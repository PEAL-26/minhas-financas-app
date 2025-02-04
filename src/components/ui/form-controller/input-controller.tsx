import { View } from "react-native";
import { Control, FieldValues, Path } from "react-hook-form";

import { Input, InputProps } from "../input";
import { Text } from "../text";
import { FormController } from "./form-controller";
import { Label } from "../label";
import { cn } from "@/lib/utils";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = InputProps & {
  label?: string;
  isLoading?: boolean;
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  containerClassName?: string;
};

export function InputController<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(props: Props<TFieldValues, TContext>) {
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
          <Input
            {...rest}
            {...field}
            editable={!isLoading || rest?.editable}
            onChangeText={(text) => field.onChange(text)}
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
