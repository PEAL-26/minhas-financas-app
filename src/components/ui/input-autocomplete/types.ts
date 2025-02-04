import { QueryFunction } from '@tanstack/react-query';
import { InputProps } from '../input';

/**
 * Propriedades do Componente InputAutocomplete
 *
 * @primaryProperty {string} - Propriedade com um valor único. ex.: "id".
 *
 * @propertySearch {string} - Propriedade que será utilizada para realizar a pesquisa ou filtro. ex.: "name".
 *
 * @queryKey {string[]} - Propriedade utilizada no useQuery para gerenciar o cache de consultas com base nas chaves de consulta. Deve ser um array de strings.
 *
 * @queryFn {function} - Propriedade utilizada no useQuery para realizar a consulta. Pode ser qualquer função que retorne uma promise.
 *
 */

export interface InputAutocompleteProps<TData = any> extends Omit<InputProps, 'onSelectionChange'> {
  valueProperty?: keyof TData;
  labelProperty?: keyof TData;
  data?: TData[];
  isLoading?: boolean;
  queryKey?: string[];
  queryFn?: QueryFunction<TData[], string[], never>;
  onSelectionChange?: (value: string) => void;
  onSelectionDataChange?: (data: TData) => void;
  onLoading?(loading: boolean): void;
}
