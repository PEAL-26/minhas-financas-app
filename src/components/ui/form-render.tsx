import { Label } from '@/components/ui/label';
import { RenderComponent } from '@/components/ui/render-component';
import { Text } from '@/components/ui/text';
import { FIELD_TYPE_ENUM } from '@/db';
import { generateData } from '@/services/data';
import debounce from 'lodash.debounce';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';
import { View } from 'react-native';

type Default = {
  id: number;
  name: string;
  description: string | null;
};

type Fields = {
  identifier: string;
  section?: Default | null;
  display: string;
  type: FIELD_TYPE_ENUM;
  data?: any | null;
  dataWhere?: any | null;
  extraField?: any | null;
  description?: string | null;
};

interface FormRenderProps {
  fields: Fields;
  value?: any;
  onUpdate?(identifier: string, data: any): void;
  onOpenOutside?(): void;
  onClearSelect?(index: number): void;
  collections?: any;
}

var lastSection = '';
var showSection = false;

export const FormRender = memo((props: FormRenderProps) => {
  const { fields, value, onUpdate, onClearSelect, collections } = props;

  if (!fields?.section?.name) {
    showSection = false;
  } else {
    if (lastSection !== fields?.section?.name) {
      lastSection = fields?.section?.name ?? '';
      showSection = true;
    } else {
      showSection = false;
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedOnUpdate = useCallback(
    debounce((identifier: string, data: any) => {
      onUpdate?.(identifier, data);
    }, 300),
    [onUpdate],
  );

  const [data, setData] = useState<{ value: string; label: string }[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(false);

  useEffect(() => {
    (async () => {
      if (fields?.type === FIELD_TYPE_ENUM.checkbox || fields?.type === FIELD_TYPE_ENUM.radio) {
        setIsLoadingData(true);

        const response = await generateData(fields.data, {
          dataWhere: fields.dataWhere,
        });

        setData(
          response.map(({ id, title }) => ({
            value: String(id),
            label: title,
          })),
        );

        setIsLoadingData(false);
      }
    })();
  }, [fields?.data, fields?.dataWhere, fields?.type]);

  const defaultValue = useMemo(() => value, [value]);
  const extras = useMemo(() => {
    if (fields?.extraField) {
      return JSON.parse(JSON.stringify(fields?.extraField));
    }

    return undefined;
  }, [fields?.extraField]);

  const dataWhere = useMemo(() => {
    if (fields?.dataWhere) {
      return JSON.parse(JSON.stringify(fields?.dataWhere));
    }

    return undefined;
  }, [fields?.dataWhere]);

  const selectData = useMemo(() => {
    if (fields?.data && fields.type === FIELD_TYPE_ENUM.select) {
      return JSON.parse(JSON.stringify(fields.data));
    }

    return undefined;
  }, [fields.data, fields.type]);

  return (
    <View className="mt-4 px-3">
      {showSection && (
        <View className="my-5 flex flex-row items-center gap-2">
          <View className="h-[1px] w-full flex-1 bg-gray-300" />
          <Text className="w-fit max-w-[80%] text-center text-gray-600">
            {fields.section?.name ?? ''}
          </Text>
          <View className="h-[1px] w-full flex-1 bg-gray-300" />
        </View>
      )}
      <View className="flex-col gap-2">
        <Label className="text-base">{fields.display}</Label>
        <RenderComponent
          data={data}
          isLoading={isLoadingData}
          type={fields.type}
          extras={extras}
          identifier={fields.identifier}
          defaultValue={defaultValue}
          onChange={(value) => {
            debouncedOnUpdate(fields.identifier, value);
          }}
          onChangeExtraField={(extra) => debouncedOnUpdate(fields.identifier, extra)}
          selectData={selectData}
          dataWhere={dataWhere}
          onClearSelect={onClearSelect}
          collections={collections}
          // onOpenOutside={onOpenOutside}
        />
      </View>
    </View>
  );
});

FormRender.displayName = 'FormRender';
