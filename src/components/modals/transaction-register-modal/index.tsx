import { useQuery } from '@tanstack/react-query';
import React from 'react';
import { FormProvider } from 'react-hook-form';
import { View } from 'react-native';

import { Button } from '@/components/ui/button';
import { useRegister } from '@/hooks/use-register';

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
import { getTransactionById, mutationTransaction } from '@/services/transactions';

import { useQueryFilter } from '@/hooks/use-query-filter';
import { listExpenses } from '@/services/expenses';
import { listIncomes } from '@/services/incomes';
import { listLocals } from '@/services/locals';
import { BottomSheetBaseModal } from '../bottom-sheet-base-modal';
import { transactionSchema, TransactionSchemaType } from './schema';
import { TransactionRegisterModalProps } from './types';

export function TransactionRegisterModal(props: TransactionRegisterModalProps) {
  const { transactionId, show, onClose } = props;

  const { form, handleSubmit, isLoading } = useRegister<TransactionSchemaType>({
    schema: transactionSchema,
    defaultValues: { id: transactionId, type: 'expense' },
    mutationFn: mutationTransaction,
    queryKey: ['transactions'],
    onSuccess: () => {
      onClose?.();
    },
  });

  const transaction = useQuery({
    queryFn: () => (transactionId ? getTransactionById(transactionId) : null),
    queryKey: ['transaction', transactionId],
  });

  const income = useQueryFilter({
    fn: listIncomes,
    queryKey: ['incomes'],
  });

  const expense = useQueryFilter({
    fn: listExpenses,
    queryKey: ['expenses'],
  });

  const incomeExpense = useQueryFilter({
    fn: listIncomes,
    queryKey: ['incomes_expenses'],
  });

  const local = useQueryFilter({
    fn: listLocals,
    queryKey: ['locals'],
  });

  return (
    <BottomSheetBaseModal
      title={transactionId ? 'Editar Transação' : 'Nova Transação'}
      show={show}
      onClose={onClose}
      isLoading={isLoading}
    >
      {transaction.isLoading && !transaction.isError && <Loading />}
      {!transaction.isLoading && transaction.isError && (
        <ErrorComponent refetch={transaction.refetch} />
      )}
      {!transaction.isLoading && !transaction.isError && (
        <FormProvider {...form}>
          <View className="flex w-full flex-col gap-3 px-3 py-4">
            <View className="flex flex-row items-center justify-center">
              <SwitchToggleTextController
                control={form.control}
                name="type"
                items={
                  [
                    { value: 'expense', title: 'Despesa' },
                    { value: 'income', title: 'Renda' },
                  ] as const
                }
                isLoading={isLoading}
                trackColors={{ off: '#ef4444', on: '#2cb547' }}
              />
            </View>
            {form.watch('type') === 'expense' && (
              <>
                <SelectController
                  isLoading={isLoading}
                  label="Despesa"
                  control={form.control}
                  name="expense"
                  labelField="title"
                  data={[{ id: 0, title: 'Nenhuma' }, ...expense.data]}
                  containerClassName="w-full"
                  search
                  onSelect={(item) => form.setValue('expense', item.id ? item : undefined)}
                />
                <SelectController
                  isLoading={isLoading}
                  label="Renda a ser usada"
                  control={form.control}
                  name="incomeExpense"
                  labelField="title"
                  data={[{ id: 0, title: 'Nenhuma' }, ...income.data]}
                  containerClassName="w-full"
                  search
                  onSelect={(item) => form.setValue('income', item.id ? item : undefined)}
                />
              </>
            )}

            {form.watch('type') === 'income' && (
              <SelectController
                isLoading={isLoading}
                label="Renda"
                control={form.control}
                name="income"
                labelField="title"
                data={[{ id: 0, title: 'Nenhuma' }, ...income.data]}
                containerClassName="w-full"
                search
                onSelect={(item) => form.setValue('income', item.id ? item : undefined)}
              />
            )}

            {!form.watch('expense') && !form.watch('income') && (
              <InputController
                label="Título"
                placeholder="Título"
                control={form.control}
                name="title"
              />
            )}

            <InputDatetimeController
              label="Data"
              control={form.control}
              name="date"
              isLoading={isLoading}
              datetimePickerProps={{ maximumDate: new Date() }}
            />

            <InputController
              label="Valor"
              control={form.control}
              name="amount"
              placeholder="Valor"
              keyboardType="number-pad"
            />

            <InputAutocompleteController
              label="Local"
              control={form.control}
              name="local.name"
              onSelectionDataChange={(item) => {
                form.setValue('local', item);
              }}
              data={local.data}
            />

            <TextareaController
              label="Observação"
              placeholder="Observação"
              control={form.control}
              name="observation"
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
