export interface FlatListItemProps<TData> {
  onPress?(data: TData): void;
  valueProperty?: keyof TData;
  labelProperty?: keyof TData;
}
