import { messageError, messageSuccess } from '@/helpers/alert-message';
import { zodResolver } from '@hookform/resolvers/zod';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { DefaultValues, FieldErrors, FieldValues, useForm } from 'react-hook-form';

interface Props<TDataRequest, TDataResponse> {
  schema: any;
  defaultValues?: DefaultValues<TDataRequest>;
  mutationFn?(data: TDataRequest): Promise<TDataResponse>;
  queryKey?: string[];
  onSuccess?(): void;
}

export function useRegister<T extends FieldValues = any, TDataResponse = any>(
  props: Props<T, TDataResponse>,
) {
  const { schema, defaultValues, mutationFn, queryKey, onSuccess } = props;

  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<T>({
    resolver: zodResolver(schema),
    mode: 'onChange',
    defaultValues,
  });

  const queryClient = useQueryClient();
  const handleSubmit = async (data: T) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      await mutationFn?.(data);
      queryClient.invalidateQueries({
        queryKey,
      });
      messageSuccess('Dados guardados com sucesso!');
      onSuccess?.();
    } catch (error: any) {
      console.error(error);
      messageError(error?.message || 'Falha ao salvar o registo.');
    } finally {
      setIsLoading(false);
    }
  };

  const onValid = (err: FieldErrors<T>) => {
    console.warn(JSON.stringify(err, null, 3));
    messageError('Preencha os campos corretamente!');
  };

  return {
    form,
    isLoading,
    handleSubmit: form.handleSubmit(handleSubmit, onValid),
  };
}
