import { PriorityComponent } from '@/components/shared/priority';
import { TypeRecurrenceComponent } from '@/components/shared/type-recurrence';
import { Button } from '@/components/ui/button';
import { ErrorComponent } from '@/components/ui/error';
import {
  InputAutocompleteController,
  InputController,
  SwitchToggleTextController,
  TextareaController,
} from '@/components/ui/form-controller';
import { Input } from '@/components/ui/input';
import { InputAutocomplete } from '@/components/ui/input-autocomplete';
import { Label } from '@/components/ui/label';
import { Loading } from '@/components/ui/loading';
import { getPercentScreenSize } from '@/helpers/get-percent-screen-size';
import { useQueryFilter } from '@/hooks/use-query-filter';
import { useRegister } from '@/hooks/use-register';
import { listCategories } from '@/services/categories';
import { getNeedById, mutationNeed } from '@/services/needs';
import { useQuery } from '@tanstack/react-query';
import { PlusIcon, TrashIcon } from 'lucide-react-native';
import React, { ElementRef, forwardRef } from 'react';
import { FormProvider, useFieldArray } from 'react-hook-form';
import { Text, View } from 'react-native';
import { BottomSheetBaseModal } from '../bottom-sheet-base-modal';
import { needSchema, NeedSchemaType } from './schema';
import { NeedRegisterModalProps } from './types';

export const NeedRegisterModal = forwardRef<
  ElementRef<typeof BottomSheetBaseModal>,
  NeedRegisterModalProps
>((props, ref) => {
  const { needId, show, onClose } = props;

  const { form, handleSubmit, isLoading } = useRegister<NeedSchemaType>({
    schema: needSchema,
    defaultValues: { id: needId, needPrices: [], priority: 1 },
    mutationFn: mutationNeed,
    queryKey: ['needs'],
    onSuccess: () => {
      onClose?.();
    },
  });

  const needPrices = useFieldArray({
    control: form.control,
    name: 'needPrices',
  });

  const need = useQuery({
    queryFn: () => (needId ? getNeedById(needId) : null),
    queryKey: ['need', needId],
  });

  const category = useQueryFilter({
    fn: listCategories,
    queryKey: ['categories'],
  });

  const sizes = getPercentScreenSize(90);
  return (
    <BottomSheetBaseModal
      title={needId ? 'Editar Necessidade' : 'Nova Necessidade'}
      show={show}
      onClose={onClose}
      isLoading={isLoading}
    >
      {need.isLoading && !need.isError && <Loading height={sizes.height} />}
      {!need.isLoading && need.isError && (
        <ErrorComponent refetch={need.refetch} height={sizes.height} />
      )}
      {!need.isLoading && !need.isError && (
        <FormProvider {...form}>
          <View className="flex w-full flex-col gap-3 px-3 py-4">
            <InputAutocompleteController
              label="Categoria"
              placeholder="Categoria"
              control={form.control}
              name="category.name"
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
              control={form.control}
              name="amount"
              isLoading={isLoading}
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
            <View className="space-y-1">
              <Label>Preços por Local</Label>
              {form?.watch('needPrices')?.map((price, index) => (
                <View key={index} className="flex flex-row items-start space-x-2">
                  <InputAutocomplete
                    placeholder="Local"
                    value={price.local?.name}
                    // onChange={(e) =>
                    //   handleNeedPriceChange(index, "local", e.target.value)
                    // }
                    // onChangeText={()=>}
                    isLoading={isLoading}
                  />
                  <Input
                  // type="number"
                  // step="0.01"
                  // placeholder="Valor"
                  // value={price.amount}
                  // onChange={(e) =>
                  //   handleNeedPriceChange(index, "amount", e.target.value)
                  // }
                  // isLoading={isLoading}
                  />
                  <Button
                    // variant="destructive"
                    // size="icon"
                    disabled={isLoading}
                    className="flex h-7 items-center justify-center rounded-md bg-red-500 px-1"
                    onPress={() => needPrices.remove(index)}
                  >
                    <TrashIcon className="h-4 w-4 text-white" />
                  </Button>
                </View>
              ))}
              <Button
                onPress={() => needPrices.append({ local: { name: '' }, amount: 0 })}
                className="mt-4 flex h-8 w-fit flex-row items-center rounded-md border border-border px-3"
                containerClassName="w-fit"
                disabled={isLoading}
              >
                <>
                  <PlusIcon className="mr-2 h-4 w-4" />
                  <Text className="text-xs">Adicionar Preço</Text>
                </>
              </Button>
            </View>

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
});

NeedRegisterModal.displayName = 'NeedRegisterModal';
