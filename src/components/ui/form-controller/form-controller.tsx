import {
  Control,
  ControllerFieldState,
  ControllerRenderProps,
  FieldPath,
  FieldValues,
  PathValue,
  Controller as RHFController,
  UseFormStateReturn,
} from 'react-hook-form';

type ChildrenType<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
> = (data: {
  field: ControllerRenderProps<TFieldValues, TName>;
  fieldState: ControllerFieldState;
  formState: UseFormStateReturn<FieldValues>;
}) => React.ReactNode;

interface FormControllerProps<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
  TContext = any,
> {
  control: Control<TFieldValues, TContext>;
  name: TName;
  defaultValue?: PathValue<TFieldValues, TName>;
  children: ChildrenType<TFieldValues, TName>;
}

export function FormController<
  TFieldValues extends FieldValues,
  TName extends FieldPath<TFieldValues>,
>(props: FormControllerProps<TFieldValues, TName>) {
  const { children, defaultValue, ...rest } = props;

  return (
    <RHFController defaultValue={defaultValue} {...rest} render={(data) => <>{children(data)}</>} />
  );
}
