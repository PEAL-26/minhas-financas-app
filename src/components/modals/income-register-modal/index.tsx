import React from "react";
import { useQuery } from "@tanstack/react-query";
import { TouchableOpacity, View } from "react-native";
import { PlusIcon, TrashIcon } from "lucide-react-native";
import { FormProvider, useFieldArray } from "react-hook-form";

import { Text } from "@/components/ui/text";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useRegister } from "@/hooks/use-register";

import {
  InputAutocompleteController,
  InputController,
  SelectController,
  TextareaController,
} from "@/components/ui/form-controller";
import { Loading } from "@/components/ui/loading";
import { BADGE_COLOR } from "@/components/ui/badge";
import { ErrorComponent } from "@/components/ui/error";
import { getIncomeById, mutationIncome } from "@/services/incomes";
import { InputAutocomplete } from "@/components/ui/input-autocomplete";
import { PRIORITY_COLOR, PRIORITY_MAP, RECURRENCES } from "@/constants";

import { IncomeRegisterModalProps } from "./types";
import { incomeSchema, IncomeSchemaType } from "./schema";
import { BottomSheetBaseModal } from "../bottom-sheet-base-modal";
import { useQueryPagination } from "@/hooks/use-query-pagination";
import { listCategories } from "@/services/categories";
import { useQueryFilter } from "@/hooks/use-query-filter";
import { PriorityComponent } from "@/components/shared/priority";
import { TypeRecurrenceComponent } from "@/components/shared/type-recurrence";

export function IncomeRegisterModal(props: IncomeRegisterModalProps) {
  const { incomeId, show, onClose } = props;

  const { form, handleSubmit, isLoading } = useRegister<IncomeSchemaType>({
    schema: incomeSchema,
    defaultValues: { incomeId, incomePrices: [], priority: 1 },
    mutationFn: mutationIncome,
  });

  const incomePrices = useFieldArray({
    control: form.control,
    name: "incomePrices",
  });

  const income = useQuery({
    queryFn: () => (incomeId ? getIncomeById(incomeId) : null),
    queryKey: ["income", incomeId],
  });

  const category = useQueryFilter({
    fn: listCategories,
    queryKey: ["categories"],
  });

  return (
    <BottomSheetBaseModal
      title={incomeId ? "Editar Necessidade" : "Nova Necessidade"}
      show={show}
      onClose={onClose}
    >
      {income.isLoading && !income.isError && <Loading />}
      {!income.isLoading && income.isError && (
        <ErrorComponent refetch={income.refetch} />
      )}
      {!income.isLoading && !income.isError && (
        <FormProvider {...form}>
          <View className="flex flex-col gap-3 w-full px-3 py-4">
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

            <View className="space-y-1">
              <Label>Preços por Local</Label>
              {form?.watch("incomePrices")?.map((price, index) => (
                <View
                  key={index}
                  className="flex flex-row items-start space-x-2"
                >
                  <InputAutocomplete
                    placeholder="Local"
                    value={price.local?.name}
                    // onChange={(e) =>
                    //   handleIncomePriceChange(index, "local", e.target.value)
                    // }
                    // onChangeText={()=>}
                  />
                  <Input
                  // type="number"
                  // step="0.01"
                  // placeholder="Valor"
                  // value={price.amount}
                  // onChange={(e) =>
                  //   handleIncomePriceChange(index, "amount", e.target.value)
                  // }
                  />
                  <Button
                    // variant="destructive"
                    // size="icon"
                    className="flex justify-center items-center h-7 bg-red-500 px-1 rounded-md"
                    onPress={() => incomePrices.remove(index)}
                  >
                    <TrashIcon className="h-4 w-4 text-white" />
                  </Button>
                </View>
              ))}
              <Button
                // variant="outline"
                onPress={() => incomePrices.append({ amount: 0 })}
                className="flex flex-row items-center rounded-md h-8 border px-3 border-border mt-4"
              >
                <>
                  <PlusIcon className="h-4 w-4 mr-2" />
                  <Text className="text-xs">Adicionar Preço</Text>
                </>
              </Button>
            </View>
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
