import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { useRegister } from '@/hooks/use-register';

import { ErrorComponent } from '@/components/ui/error';
import {
  InputController,
  InputDatetimeController,
  SwitchToggleTextController,
  TextareaController,
} from '@/components/ui/form-controller';
import { Loading } from '@/components/ui/loading';
import { getIncomeById, mutationIncome } from '@/services/incomes';

import { PriorityComponent } from '@/components/shared/priority';
import { TypeRecurrenceComponent } from '@/components/shared/type-recurrence';
import { BottomSheetBaseModal } from '../bottom-sheet-base-modal';
import { incomeSchema, IncomeSchemaType } from './schema';
import { IncomeRegisterModalProps } from './types';

export function IncomeRegisterModal(props: IncomeRegisterModalProps) {
  const { incomeId, show, onClose } = props;

  const { form, handleSubmit, isLoading } = useRegister<IncomeSchemaType>({
    schema: incomeSchema,
    defaultValues: { id: incomeId },
    mutationFn: mutationIncome,
    queryKey: ['incomes'],
    onSuccess: () => {
      onClose?.();
    },
  });

  const income = useQuery({
    queryFn: () => (incomeId ? getIncomeById(incomeId) : null),
    queryKey: ['income', incomeId],
  });

  return (
    <BottomSheetBaseModal
      title={incomeId ? 'Editar Renda' : 'Nova Renda'}
      show={show}
      onClose={onClose}
      isLoading={isLoading}
    >
      {income.isLoading && !income.isError && <Loading />}
      {!income.isLoading && income.isError && <ErrorComponent refetch={income.refetch} />}
      {!income.isLoading && !income.isError && (
        <FormProvider {...form}>
          <View className="flex w-full flex-col gap-3 px-3 py-4">
            <InputController
              label="Título"
              placeholder="Título"
              control={form.control}
              name="title"
              isLoading={isLoading}
            />
            <View className="flex flex-row items-center gap-3">
              <View className="flex-1">
                <InputDatetimeController
                  label="Data"
                  control={form.control}
                  name="date"
                  isLoading={isLoading}
                />
              </View>
              <View className="flex-1">
                <InputController
                  label="Moeda"
                  placeholder="Moeda"
                  control={form.control}
                  name="currency"
                  isLoading={isLoading}
                />
              </View>
            </View>

            <TextareaController
              label="Descrição"
              control={form.control}
              name="description"
              placeholder="Descrição"
              isLoading={isLoading}
            />

            <PriorityComponent form={form} />

            <TypeRecurrenceComponent form={form} />

            <InputController
              label="Valor"
              control={form.control}
              name="amount"
              placeholder="Valor"
              keyboardType="number-pad"
            />

            <SwitchToggleTextController
              label="Estado"
              control={form.control}
              name="status"
              items={
                [
                  { value: 'pending', title: 'Pendente' },
                  { value: 'done', title: 'Efectuada' },
                ] as const
              }
              isLoading={isLoading}
            />

            <Button
              disabled={isLoading}
              containerClassName="w-full"
              className="flex h-10 w-full flex-row items-center justify-center rounded-md bg-primary"
              textClassName="text-white"
              onPress={handleSubmit}
            >
              Guardar
            </Button>
          </View>
        </FormProvider>
      )}
    </BottomSheetBaseModal>
  );
}
