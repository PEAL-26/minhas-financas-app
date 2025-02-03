import React from "react";
import { useQuery } from "@tanstack/react-query";
import { View } from "react-native";
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
  TextareaController,
} from "@/components/ui/form-controller";
import { Loading } from "@/components/ui/loading";
import { ErrorComponent } from "@/components/ui/error";
import { getNeedById, mutationNeed } from "@/services/needs";
import { InputAutocomplete } from "@/components/ui/input-autocomplete";

import { NeedRegisterModalProps } from "./types";
import { needSchema, NeedSchemaType } from "./schema";
import { BottomSheetBaseModal } from "../bottom-sheet-base-modal";
import { listCategories } from "@/services/categories";
import { useQueryFilter } from "@/hooks/use-query-filter";
import { PriorityComponent } from "@/components/shared/priority";
import { TypeRecurrenceComponent } from "@/components/shared/type-recurrence";

export function NeedRegisterModal(props: NeedRegisterModalProps) {
  const { needId, show, onClose } = props;

  const { form, handleSubmit, isLoading } = useRegister<NeedSchemaType>({
    schema: needSchema,
    defaultValues: { needId, needPrices: [], priority: 1 },
    mutationFn: mutationNeed,
  });

  const needPrices = useFieldArray({
    control: form.control,
    name: "needPrices",
  });

  const need = useQuery({
    queryFn: () => (needId ? getNeedById(needId) : null),
    queryKey: ["need", needId],
  });

  const category = useQueryFilter({
    fn: listCategories,
    queryKey: ["categories"],
  });

  return (
    <BottomSheetBaseModal
      title={needId ? "Editar Necessidade" : "Nova Necessidade"}
      show={show}
      onClose={onClose}
    >
      {need.isLoading && !need.isError && <Loading />}
      {!need.isLoading && need.isError && (
        <ErrorComponent refetch={need.refetch} />
      )}
      {!need.isLoading && !need.isError && (
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
              {form?.watch("needPrices")?.map((price, index) => (
                <View
                  key={index}
                  className="flex flex-row items-start space-x-2"
                >
                  <InputAutocomplete
                    placeholder="Local"
                    value={price.local?.name}
                    // onChange={(e) =>
                    //   handleNeedPriceChange(index, "local", e.target.value)
                    // }
                    // onChangeText={()=>}
                  />
                  <Input
                  // type="number"
                  // step="0.01"
                  // placeholder="Valor"
                  // value={price.amount}
                  // onChange={(e) =>
                  //   handleNeedPriceChange(index, "amount", e.target.value)
                  // }
                  />
                  <Button
                    // variant="destructive"
                    // size="icon"
                    className="flex justify-center items-center h-7 bg-red-500 px-1 rounded-md"
                    onPress={() => needPrices.remove(index)}
                  >
                    <TrashIcon className="h-4 w-4 text-white" />
                  </Button>
                </View>
              ))}
              <Button
                // variant="outline"
                onPress={() => needPrices.append({ amount: 0 })}
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
