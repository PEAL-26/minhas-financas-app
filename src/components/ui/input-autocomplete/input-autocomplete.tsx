import { AutocompleteInput } from 'react-native-autocomplete-input';

import { colors } from '@/styles/colors';
import { ElementRef, forwardRef } from 'react';
import { ScrollView } from 'react-native';
import { FlatListItem } from './flat-list-item';
import { styles } from './styles';
import { InputAutocompleteProps } from './types';
import { useInputAutocomplete } from './use-input-autocomplete';

/**
 * Componente InputAutocomplete
 *
 * Este componente possui as seguintes propriedades:
 *
 * @primaryProperty {string} - Propriedade com um valor único. ex.: "id".
 *
 * @propertySearch {string} - Propriedade que será utilizada para realizar a pesquisa ou filtro. ex.: "name".
 *
 * @queryKey {string[]} - Propriedade utilizada no useQuery para gerenciar o cache de consultas com base nas chaves de consulta. Deve ser um array de strings.
 *
 * @queryFn {function} - Propriedade utilizada no useQuery para realizar a consulta. Pode ser qualquer função que retorne uma promise.
 *
 * Exemplo de uso:
 *
 * <InputAutocomplete
 *   primaryProperty="id"
 *   propertySearch="name"
 *   queryKey={["people"]}
 *   queryFn={itsQueryFunction}
 * />
 */
export const InputAutocomplete = forwardRef<
  ElementRef<typeof AutocompleteInput>,
  InputAutocompleteProps<any>
>((props, ref) => {
  const { valueProperty = 'id', labelProperty = 'name', placeholder, data } = props;
  const {
    isLoading,
    /*suggestions,*/ query,
    isFocused,
    setQuery,
    handleSelectionChange,
    setIsFocused,
  } = useInputAutocomplete(props);

  return (
    <ScrollView horizontal={true} style={styles.scrollView}>
      <AutocompleteInput
        editable={props.editable || !isLoading}
        autoCorrect={false}
        data={isFocused ? data || [] : []}
        value={query}
        onChangeText={setQuery}
        placeholder={isLoading ? 'Carregando...' : placeholder}
        flatListProps={FlatListItem<any>({
          onPress: handleSelectionChange,
          valueProperty,
          labelProperty,
        })}
        selectionColor={colors.primary.DEFAULT}
        style={[styles.input, props.editable === false && styles.disabled, props.style]}
        className="h-8 rounded-md border border-input bg-background px-3 text-xs file:border-0 file:bg-transparent file:font-medium placeholder:text-muted-foreground web:flex web:w-full web:ring-offset-background web:focus-visible:outline-none web:focus-visible:ring-0 web:focus-visible:ring-primary web:focus-visible:ring-offset-0"
        placeholderTextColor="#888"
        containerStyle={styles.container}
        listContainerStyle={styles.listContainer}
        inputContainerStyle={styles.inputContainer}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        onSelectionChange={(data) => {
          if (data) {
            console.log('select', data);
          }
        }}
        onChange={(e) => {
          console.log('change');
        }}
      />
    </ScrollView>
  );
});

InputAutocomplete.displayName = 'InputAutocomplete';
