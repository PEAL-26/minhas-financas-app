import { View } from "react-native";
import { Control, FieldValues, Path } from "react-hook-form";

import { SwitchToggleText, SwitchToggleTextProps } from "../switch-toggle-text";
import { Text } from "../text";
import { FormController } from "./form-controller";
import { Label } from "../label";
import { cn } from "@/lib/utils";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TValue = any
> = SwitchToggleTextProps<TValue> & {
  label?: string;
  isLoading?: boolean;
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  containerClassName?: string;
};

export function SwitchToggleTextController<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any,
  TValue = any
>(props: Props<TFieldValues, TContext, TValue>) {
  const { name, control, defaultValue, label, containerClassName, ...rest } =
    props;
  return (
    <FormController defaultValue={defaultValue} name={name} control={control}>
      {({ field, fieldState }) => (
        <View className={cn("flex flex-col", containerClassName)}>
          <View
            className={cn(
              "flex flex-row items-center gap-2 flex-1 justify-between"
            )}
          >
            {label && <Label>{label}</Label>}
            <SwitchToggleText
              {...rest}
              value={field.value}
              onChangeValue={(value) => field.onChange(value)}
            />
          </View>
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
