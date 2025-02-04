import { View } from "react-native";
import { Control, FieldValues, Path } from "react-hook-form";

import { Textarea, TextareaProps } from "../textarea";
import { Text } from "../text";
import { FormController } from "./form-controller";
import { Label } from "../label";
import { cn } from "@/lib/utils";

type Props<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
> = TextareaProps & {
  label?: string;
  isLoading?: boolean;
  control: Control<TFieldValues, TContext>;
  name: Path<TFieldValues>;
  defaultValue?: any;
  containerClassName?: string;
};

export function TextareaController<
  TFieldValues extends FieldValues = FieldValues,
  TContext = any
>(props: Props<TFieldValues, TContext>) {
  const { name, control, defaultValue, label, containerClassName, ...rest } =
    props;
  return (
    <FormController defaultValue={defaultValue} name={name} control={control}>
      {({ field, fieldState }) => (
        <View className={cn("flex flex-col", containerClassName)}>
          {label && <Label className="mb-2">{label}</Label>}
          <Textarea
            {...rest}
            {...field}
            onChangeText={(text) => field.onChange(text)}
          />
          {fieldState?.error?.message && (
            <Text className="text-xs text-red-500 mt-1F">
              {fieldState?.error?.message}
            </Text>
          )}
        </View>
      )}
    </FormController>
  );
}
