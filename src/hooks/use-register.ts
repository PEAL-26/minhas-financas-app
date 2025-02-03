import { FieldErrors, FieldValues, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";

interface Props<T> {
  schema: any;
  defaultValues?: any;
  mutationFn?(data: T): Promise<void>;
}

export function useRegister<T extends FieldValues>(props: Props<T>) {
  const { schema, defaultValues, mutationFn } = props;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: "onChange",
    defaultValues,
  });

  const handleSubmit = async (data: T) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await mutationFn?.(data);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const onValid = (err: FieldErrors<T>) => {
    console.error(err);
  };

  return {
    form,
    isLoading,
    handleSubmit: form.handleSubmit(handleSubmit, onValid),
  };
}
