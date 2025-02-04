import { RECURRENCES } from '@/constants';
import { View } from 'react-native';
import { InputController, SelectController } from '../ui/form-controller';

interface Props {
  form: any;
  isLoading?: boolean;
}

export function TypeRecurrenceComponent(props: Props) {
  const { form, isLoading } = props;
  return (
    <>
      <View className="grid flex-1 grid-cols-2 flex-row items-center gap-2">
        <View className="flex-1">
          <SelectController
            disabled={isLoading}
            label="Tipo"
            control={form.control}
            name="type"
            labelField="title"
            data={[
              { id: 'unique' as const, title: 'Única' },
              { id: 'recurrent' as const, title: 'Recorrente' },
            ]}
            containerClassName="w-full"
            onSelect={({ id }) => {
              if (id === 'unique') {
                form.setValue('recurrence', undefined);
                form.setValue('customRecurrence', undefined);
              }

              form.setValue('type', id);
            }}
          />
        </View>
        <View className="flex-1">
          {form.watch('type') === 'recurrent' && (
            <SelectController
              disabled={isLoading}
              label="Recorrência"
              control={form.control}
              name="recurrence"
              labelField="title"
              containerClassName="w-full"
              data={RECURRENCES}
              onSelect={({ id }) => form.setValue('recurrence', id)}
            />
          )}
        </View>
      </View>

      {form.watch('type') === 'recurrent' && form.watch('recurrence') === null && (
        <InputController
          isLoading={isLoading}
          label="Recorrência (em dias)"
          control={form.control}
          name="customRecurrence"
        />
      )}
    </>
  );
}
