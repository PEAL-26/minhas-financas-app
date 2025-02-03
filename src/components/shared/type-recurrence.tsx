import { View } from "react-native";
import { InputController, SelectController } from "../ui/form-controller";
import { RECURRENCES } from "@/constants";

interface Props {
  form: any;
}

export function TypeRecurrenceComponent(props: Props) {
  const { form } = props;
  return (
    <>
      <View className="grid grid-cols-2 flex-row items-center gap-2 flex-1">
        <SelectController
          label="Tipo"
          control={form.control}
          name="type"
          labelField="title"
          data={[
            { id: "unique" as const, title: "Única" },
            { id: "recurrent" as const, title: "Recorrente" },
          ]}
          containerClassName="w-full"
          onSelect={({ id }) => {
            if (id === "unique") {
              form.setValue("recurrence", undefined);
              form.setValue("customRecurrence", undefined);
            }

            form.setValue("type", id);
          }}
        />

        {form.watch("type") === "recurrent" && (
          <SelectController
            label="Recorrência"
            control={form.control}
            name="recurrence"
            labelField="title"
            containerClassName="w-full"
            data={RECURRENCES}
            onSelect={({ id }) => form.setValue("recurrence", id)}
          />
        )}
      </View>

      {form.watch("type") === "recurrent" &&
        form.watch("recurrence") === null && (
          <InputController
            label="Recorrência (em dias)"
            control={form.control}
            name="customRecurrence"
          />
        )}
    </>
  );
}
