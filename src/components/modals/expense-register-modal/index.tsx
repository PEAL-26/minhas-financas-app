import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { PriorityComponent } from '@/components/shared/priority';
import { TypeRecurrenceComponent } from '@/components/shared/type-recurrence';
import { Button } from '@/components/ui/button';
import { ErrorComponent } from '@/components/ui/error';
import {
  InputAutocompleteController,
  InputController,
  InputDatetimeController,
  SelectController,
  SwitchToggleTextController,
  TextareaController,
} from '@/components/ui/form-controller';
import { Loading } from '@/components/ui/loading';
import { useQueryFilter } from '@/hooks/use-query-filter';
import { useRegister } from '@/hooks/use-register';
import { listCategories } from '@/services/categories';
import { getExpenseById, mutationExpense } from '@/services/expenses';
import { listIncomes } from '@/services/incomes';
import { listNeeds } from '@/services/needs';

import { BottomSheetBaseModal } from '../bottom-sheet-base-modal';
import { expenseSchema, ExpenseSchemaType } from './schema';
import { ExpenseRegisterModalProps } from './types';

export function ExpenseRegisterModal(props: ExpenseRegisterModalProps) {
  const { expenseId, show, onClose } = props;

  const { form, handleSubmit, isLoading } = useRegister<ExpenseSchemaType>({
    schema: expenseSchema,
    defaultValues: { id: expenseId },
    mutationFn: mutationExpense,
    queryKey: ['expenses'],
    onSuccess: () => {
      onClose?.();
    },
  });

  const expense = useQuery({
    queryFn: () => (expenseId ? getExpenseById(expenseId) : null),
    queryKey: ['expense', expenseId],
  });

  const category = useQueryFilter({
    fn: listCategories,
    queryKey: ['categories'],
  });

  const need = useQueryFilter({
    fn: listNeeds,
    queryKey: ['needs'],
  });

  const income = useQueryFilter({
    fn: listIncomes,
    queryKey: ['incomes'],
  });

  return (
    <BottomSheetBaseModal
      title={expenseId ? 'Editar Despesa' : 'Nova Despesa'}
      show={show}
      onClose={onClose}
      isLoading={isLoading}
    >
      {expense.isLoading && !expense.isError && <Loading />}
      {!expense.isLoading && expense.isError && <ErrorComponent refetch={expense.refetch} />}
      {!expense.isLoading && !expense.isError && (
        <FormProvider {...form}>
          <View className="flex w-full flex-col gap-4 px-4 py-4">
            <SelectController
              isLoading={isLoading}
              label="Necessidade"
              control={form.control}
              name="need"
              labelField="title"
              data={[{ id: 0, title: 'Nenhuma' }, ...need.data]}
              containerClassName="w-full"
              search
              onSelect={(item) => form.setValue('need', item.id ? item : undefined)}
            />

            <SelectController
              label="Renda"
              control={form.control}
              name="income"
              labelField="title"
              data={[{ id: 0, title: 'Nenhuma' }, ...income.data]}
              containerClassName="w-full"
              search
              onSelect={(item) => form.setValue('income', item.id ? item : undefined)}
              isLoading={isLoading}
            />

            <InputAutocompleteController
              label="Categoria"
              control={form.control}
              name="category.name"
              placeholder="Categoria"
              onSelectionDataChange={(item) => {
                form.setValue('category', item);
              }}
              data={category.data}
              isLoading={isLoading}
            />

            <InputController
              label="Título"
              placeholder="Título"
              control={form.control}
              name="title"
              isLoading={isLoading}
            />

            <InputDatetimeController
              label="Data"
              control={form.control}
              name="date"
              isLoading={isLoading}
            />

            <TextareaController
              label="Descrição"
              placeholder="Descrição"
              control={form.control}
              name="description"
              isLoading={isLoading}
            />

            <PriorityComponent form={form} isLoading={isLoading} />

            <TypeRecurrenceComponent form={form} isLoading={isLoading} />

            <InputController
              label="Valor"
              placeholder="Valor"
              control={form.control}
              name="amount"
              isLoading={isLoading}
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
              isLoading={isLoading}
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
