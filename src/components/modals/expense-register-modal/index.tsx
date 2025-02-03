import React from "react";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
import { FormProvider } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/use-register";
import {
  InputAutocompleteController,
  InputController,
  SelectController,
  SwitchToggleTextController,
  TextareaController,
} from "@/components/ui/form-controller";
import { Loading } from "@/components/ui/loading";
import { ErrorComponent } from "@/components/ui/error";
import { getExpenseById, mutationExpense } from "@/services/expenses";
import { useQueryFilter } from "@/hooks/use-query-filter";
import { PriorityComponent } from "@/components/shared/priority";
import { TypeRecurrenceComponent } from "@/components/shared/type-recurrence";
import { listNeeds } from "@/services/needs";
import { listIncomes } from "@/services/incomes";
import { listCategories } from "@/services/categories";

import { ExpenseRegisterModalProps } from "./types";
import { expenseSchema, ExpenseSchemaType } from "./schema";
import { BottomSheetBaseModal } from "../bottom-sheet-base-modal";

export function ExpenseRegisterModal(props: ExpenseRegisterModalProps) {
  const { expenseId, show, onClose } = props;

  const { form, handleSubmit, isLoading } = useRegister<ExpenseSchemaType>({
    schema: expenseSchema,
    defaultValues: { expenseId, expensePrices: [], priority: 1 },
    mutationFn: mutationExpense,
  });

  const expense = useQuery({
    queryFn: () => (expenseId ? getExpenseById(expenseId) : null),
    queryKey: ["expense", expenseId],
  });

  const category = useQueryFilter({
    fn: listCategories,
    queryKey: ["categories"],
  });

  const need = useQueryFilter({
    fn: listNeeds,
    queryKey: ["needs"],
  });

  const income = useQueryFilter({
    fn: listIncomes,
    queryKey: ["incomes"],
  });

  return (
    <BottomSheetBaseModal
      title={expenseId ? "Editar Despesa" : "Nova Despesa"}
      show={show}
      onClose={onClose}
    >
      {expense.isLoading && !expense.isError && <Loading />}
      {!expense.isLoading && expense.isError && (
        <ErrorComponent refetch={expense.refetch} />
      )}
      {!expense.isLoading && !expense.isError && (
        <FormProvider {...form}>
          <View className="flex flex-col gap-4 w-full px-4 py-4">
            <SelectController
              label="Necessidade"
              control={form.control}
              name="need"
              labelField="name"
              data={[{ id: 0, name: "Nenhuma" }, ...need.data]}
              containerClassName="w-full"
              search
              onSelect={(item) =>
                form.setValue("need", item.id ? item : undefined)
              }
            />

            <SelectController
              label="Renda"
              control={form.control}
              name="income"
              labelField="name"
              data={[{ id: 0, name: "Nenhuma" }, ...income.data]}
              containerClassName="w-full"
              search
              onSelect={(item) =>
                form.setValue("income", item.id ? item : undefined)
              }
            />

            <InputAutocompleteController
              label="Categoria"
              control={form.control}
              name="category.name"
              onSelectionDataChange={(item) => {
                form.setValue("category", item);
              }}
              data={category.data}
            />

            <InputController
              label="Título"
              control={form.control}
              name="title"
            />

            <TextareaController
              label="Descrição"
              control={form.control}
              name="description"
            />
            <PriorityComponent form={form} />
            <TypeRecurrenceComponent form={form} />

            <InputController
              label="Valor"
              control={form.control}
              name="amount"
            />

            <SwitchToggleTextController
              label="Estado"
              control={form.control}
              name="status"
              items={
                [
                  { value: "pending", title: "Pendente" },
                  { value: "done", title: "Efectuada" },
                ] as const
              }
            />

            <Button
              disabled={isLoading}
              containerClassName="w-full"
              className="w-full bg-primary h-10 rounded-md flex flex-row justify-center items-center"
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
